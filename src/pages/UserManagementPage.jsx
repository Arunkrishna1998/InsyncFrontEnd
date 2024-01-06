import React, { useEffect, useState } from 'react';
import AdminSideBar from '../components/AdminSideBar';

import userListApi from '../api/userListApi';
import blockUserApi from '../api/blockUserApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userListApi();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [reset]);

  // const fetchData = async () => {
  //   try {
  //     setUsers([]);
  //     const data = await userListApi();
  //     setUsers(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleBlockUser = async (userId) => {
      try {
        await blockUserApi(userId);
        if (reset) { setReset((prevState) => !prevState); }
        else { setReset((prevState) => !prevState); }
        toast.success('User Block toggled successfully!', {
            position: "top-right",
            theme: "dark",
        });
      } catch (error) {
        toast.error('Failure, User Block not toggled!', {
            position: "top-right",
            theme: "dark",
        });
      }
  };
  

  return (
    <AdminSideBar>
      <div className="mx-auto">
        <h1 className='text-center text-xl public font-bold'>Users Management</h1>
        <table className="w-full border-collapse mt-4">
            <thead>
                <tr>
                <th className="px-4 py-2">Profile Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">User Email</th>
                {/* <th className="px-4 py-2">Report</th> */}
                <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user) => (
                <tr key={user.id}>
                    <td className="px-4 py-2">
                    <img className="rounded-full w-12 mx-auto" src={user.profile_image} alt="Post" />
                    </td>
                    <td className="px-4 py-2">
                    {user.first_name} {user.last_name}
                    </td>
                    <td className="px-4 py-2">{user.email}</td>
                    {/* <td className="px-4 py-2">
                    {user.reported_posts_count === 0 ? '-' : `${user.reported_posts_count} posts reported`}
                    </td> */}
                    <td className="px-4 py-2">
                    {user.is_superuser ? (
                        <button
                        type="button"
                        className="inline-block rounded bg-black px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                        >
                        Admin
                        </button>
                    ) : user.is_active ? (
                        <button
                        type="button"
                        className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64]"
                        style={{ backgroundColor: 'crimson' }}
                        onClick={() => handleBlockUser(user.id)}
                        >
                        Block
                        </button>
                    ) : (
                        <button
                        type="button"
                        className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64]"
                        style={{ backgroundColor: '#8fce00' }}
                        onClick={() => handleBlockUser(user.id)}
                        >
                        Allow
                        </button>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>

      </div>
      <ToastContainer />
    </AdminSideBar>
  );
};

export default UserManagementPage;
