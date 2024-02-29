import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL} from '../config';


export const register = createAsyncThunk(
    'users/register/',
    async ({first_name, last_name, email, age, password }, thunkApi) => {
        const body = JSON.stringify({
            first_name,
            last_name,
            age,
            email,
            password
        })
        try {
            const res = await fetch(`${BASE_URL}/api/users/register/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            })

            const data = await res.json();
            if (res.status === 201) {
                return data;
            } else {
                return thunkApi.rejectWithValue(data);
            }
        } catch(err) {
            return thunkApi.rejectWithValue(err.response.data);
        };
    }
)



export const getUser = createAsyncThunk('users/me', async (_, thunkApi) => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const auth_token =  `Bearer ${accessToken}`        
        if (!accessToken) {
            throw new Error("Access token not found");
        }

        const res = await fetch(`${BASE_URL}/api/users/me/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: auth_token,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch user');
        }

        const data = await res.json();
        
        return data;
    } catch (err) {
        return thunkApi.rejectWithValue(err.message || 'Failed to fetch user');
    }
});




export const login = createAsyncThunk(
    'users/login/',
    async ({ email, password }, thunkApi) => {
        const body = JSON.stringify({
            email,
            password
        })
        try {
            const res = await fetch(`${BASE_URL}/api/token/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            })

            const data = await res.json();
            if (res.status === 200) {
                console.log("Logging In User ")
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                const { dispatch } = thunkApi;
                dispatch(getUser());
                return data;
            } else {
                return thunkApi.rejectWithValue(data);
            }
        } catch(err) {
            return thunkApi.rejectWithValue(err.response.data);
        };
    }
);





export const checkAuth = createAsyncThunk('users/verify/', async (_, thunkApi) => {
    const accessToken = localStorage.getItem('access_token');
    const body = JSON.stringify({ token: accessToken });
    
    try {
        const res = await fetch(`${BASE_URL}/api/token/verify/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body,
        });
        const data = await res.json();

        if (res.status === 200) {
            const { dispatch } = thunkApi;
            dispatch(getUser());
            return data;
        } else if (res.status === 401) {
            const { dispatch } = thunkApi;
            await dispatch(updateToken());
            const updateTokenResult = thunkApi.getState().userSlice;
            if (updateTokenResult.isAuthenticated) {
                const { dispatch } = thunkApi;
                dispatch(getUser());
                return data;
            } else {
                return thunkApi.rejectWithValue(updateTokenResult.error);
            }
        } else {
            return thunkApi.rejectWithValue(data);
        }
    } catch (err) {
        return thunkApi.rejectWithValue(err.response.data);
    }
});


export const updateToken = createAsyncThunk(
    'users/refresh/',
    async (_, thunkApi) => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            throw new Error('No refresh token found.');
        }
        const body = JSON.stringify({ token : refreshToken })
        try {
            const res = await fetch(`${BASE_URL}/api/token/refresh/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
            })
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                const { dispatch } = thunkApi;
                dispatch(getUser());
                return data;
            } else {
                const { dispatch } = thunkApi;
                dispatch(logout());
                return thunkApi.rejectWithValue(data);
            }
        } catch(err) {
            return thunkApi.rejectWithValue(err.response.data);
        };
    }
);

export const logout = createAsyncThunk('users/logout', async (_, thunkApi) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return undefined;
});

const initialState = {
    isAuthenticated: false,
    user: null, 
    isSuperuser: false,
    loading: false,
    registered: false,
    accessToken: null,
    refreshToken: null,
};

 const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetRegistered: state => {
            state.registered = false;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(register.pending, state => {
            state.loading = true;
          })
          .addCase(register.fulfilled, state => {
            state.registered = true;
            state.loading = false;
          })
          .addCase(register.rejected, state => {
            state.loading = false;
          })
          .addCase(login.pending, state => {
            state.loading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
          })
          .addCase(login.rejected, state => {
            state.loading = false;
          })
          .addCase(getUser.pending, state => {
            state.loading = true;
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isSuperuser = state.user.is_superuser
          })
          .addCase(getUser.rejected, state => {
            state.loading = false;
          })
          .addCase(checkAuth.pending, state => {
            state.loading = true;
          })
          .addCase(checkAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
          })
          .addCase(checkAuth.rejected, state => {
            state.loading = false;
          })
          .addCase(updateToken.pending, state => {
            state.loading = true;
          })
          .addCase(updateToken.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
          })
          .addCase(updateToken.rejected, state => {
            state.loading = false;
          })
          .addCase(logout.pending, state => {
            state.loading = true;
          })
          .addCase(logout.fulfilled, state => {
            state.loading = false;
            state.isAuthenticated = false
            state.user = null
            state.accessToken = null
            state.refreshToken = null
            state.isSuperuser = false
          })
          .addCase(logout.rejected, state => {
            state.loading = false;
          });
      },
 });

 export const { resetRegistered } = userSlice.actions;
 export default userSlice.reducer;
