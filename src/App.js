import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth, updateToken } from './features/user';

import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import PostsPage from './pages/PostsPage';
import MessagesPage from './pages/MessagesPage';
import MyNetworksPage from './pages/MyNetworksPage';
import PostDetailPage from './pages/PostDetailPage';
import SettingsPage from './pages/SettingsPage';
import SettingInterestsPage from './pages/SettingInterestsPage';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PostsMangement from './pages/PostsMangement';
import UserManagementPage from './pages/UserManagementPage';
import BlockedPage from './pages/BlockedPage';

import NotFoundPage from './pages/NotFoundPage';
import ReportedPage from './pages/ReportedPage';
import ForgotPassword from './pages/ForgotPassword';
import PasswordResetWrapper from './pages/PasswordReset';
import ChangePassword from './pages/ChangePassword';
import UserSearchResult from './pages/UserSearchResults';



function App() {
  const dispatch = useDispatch();
  const access = localStorage.getItem('access_token');

  useEffect(()=> {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(()=> {
    let timeDiff = 1000 * 60 * 85
    let interval = setInterval(() => {
      if (access) {
        dispatch(updateToken());
      }
    }, timeDiff)
    return () => clearInterval(interval);
  }, [dispatch, access])

  return (
    <Router>
      <Routes>
        <Route path='/' element={< LoginPage/>} />
        <Route path='/profile/:email' element={< Dashboard/>} />
        <Route path='/register' element={< RegisterPage/>} />
        <Route path='/forgot' element={< ForgotPassword/>} />
        <Route path='/password-reset/:uid/:token' element={< PasswordResetWrapper/>} />
        <Route path='/messages' element={< MessagesPage/>} />
        <Route path='/about' element={< AboutPage/>} />
        <Route path='/home' element={< PostsPage/>} />
        <Route path='/home/:search' element={< PostsPage/>} />
        <Route path='/post/:postId' element={< PostDetailPage/>} />
        <Route path='/network' element={< MyNetworksPage/>} />
        <Route path='/settings' element={< SettingsPage/>} />
        <Route path='/settings/profile' element={<SettingInterestsPage />} />
        <Route path='/settings/password' element={<ChangePassword />} />

        <Route path='/user-search/:searchQuery' element={< UserSearchResult/>} />
        

        <Route path='/admin-login' element={< AdminLogin/>} />
        <Route path='/admin' element={< AdminDashboard/>} />
        <Route path='/admin/post' element={< PostsMangement/>} />
        <Route path='/admin/user' element={< UserManagementPage/>} />
        <Route path='/admin/blocked' element={< BlockedPage/>} />
        <Route path='/admin/reported' element={< ReportedPage/>} />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default App;
