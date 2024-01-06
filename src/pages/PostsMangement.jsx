import React, { useEffect, useState } from 'react';
import AdminSideBar from '../components/AdminSideBar';

import postapi from '../api/postapi';
import blockPostApi from '../api/blockPostApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostPageModal from '../components/PostPageModal';
import { useSelector } from 'react-redux';

const PostsManagement = () => {
  const { loading, user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await postapi();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-8 w-8 align-[0.125em] text-danger"
          role="status"
        >
          <span
            className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0"
            style={{ clip: "rect(0,0,0,0)" }}
          >
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const handlePostClick = (postId) => {
    setPostId(postId);
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setShowPostModal(false);
    setPostId(null);
  };

  const handleDeletePost = async (postId) => {
    try {
      await blockPostApi(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      toast.success('Post Blocked successfully!', {
        position: "top-right",
        theme: "dark",
    });
    } catch (error) {
      toast.error('Failure, post not blocked!', {
        position: "top-right",
        theme: "dark",
      });
    }
  };
  

  return (
    <AdminSideBar>
      <PostPageModal isVisible={showPostModal} onClose={closePostModal} postId={postId}/>
      <div className="mx-auto">
        <h1 className='text-center text-xl public font-bold'>Posts Management</h1>
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Post image</th>
              <th className="px-4 py-2">Post Description</th>
              <th className="px-4 py-2">Post User</th>
              <th className="px-4 py-2">Report</th>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-2">
                  <img className="rounded-full cursor-pointer w-12" onClick={()=>handlePostClick(post.id)} src={post.post_img} alt="Post" />
                </td>
                <td className="px-4 py-2 max-w-[200px] truncate">
                  {post.content}
                </td>
                <td className="px-4 py-2">
                  {post.author.first_name} {post.author.last_name}
                </td>
                <td className="px-4 py-2">{ post.reports_count === 0 ? '-': `Reported by ${post.reports_count} users` }</td>
                <td className="px-4 py-2">{post.author.email}</td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64]"
                    style={{backgroundColor:'crimson'}}
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Block Post
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      < ToastContainer />
    </AdminSideBar>
  );
};

export default PostsManagement;
