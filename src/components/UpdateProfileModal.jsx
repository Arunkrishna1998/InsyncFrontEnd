import React, { useState } from "react";
import { toast } from 'react-toastify';
import updateUserApi from "../api/updateUserApi";
import { getUser } from "../features/user";
import { useDispatch, useSelector } from "react-redux";

const UpdateProfileModal = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [postImage, setPostImage] = useState(null);
  const [formVal, setFormVal] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    age: user.age,
    country: user.country,
    education: user.education,
    work: user.work
  });
  const [imageError, setImageError] = useState(null);

  const { first_name, last_name, age, country, education, work } = formVal;

  const onChange = e => {
    setFormVal({...formVal, [e.target.name]: e.target.value });
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // Check if an image is selected
    if (!selectedImage) {
      setPostImage(null);
      setImageError(null);
      return;
    }

    // Check image type (file extension)
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedImageTypes.includes(selectedImage.type)) {
      setImageError("Invalid image type. Please select a JPEG, PNG, or GIF image.");
      setPostImage(null);
      return;
    }

    // Check image size
    const maxFileSizeMB = 1.5;
    if (selectedImage.size > maxFileSizeMB * 1024 * 1024) {
      setImageError(`Image size exceeds ${maxFileSizeMB}MB. Please choose a smaller image.`);
      setPostImage(null);
      return;
    }

    // If image passes validation, set it
    setPostImage(selectedImage);
    setImageError(null);
  }

  if (!isVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await updateUserApi( formVal, postImage);
        dispatch(getUser());
        onClose();
        toast.success('Post Updated successfully!', {
          position: "top-center",
        });
      } catch (error) {
        toast.error('Failure, Post not Updated!', {
          position: "top-center",
        });
    }
  };

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-50 z-10 mt-16 backdrop:blur-md flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          onClick={onClose}
          className="text--white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-[#020202] p-4 karla rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                for="formFileSm"
                className="mb-2 inline-block text-white text-lg dark:text-neutral-200"
              >
                Update Profile
              </label>
              <div className="pt-2 text-neutral-200 text-sm font-medium flex items-start">
                <label for="formFileSm" className="ms-4 cursor-pointer">
                  <span className="material-symbols-outlined font-semibold"> add_photo_alternate</span>
                  <input
                    class="hidden"
                    id="formFileSm"
                    onChange={handleImageChange}
                    type="file"
                  />&nbsp; &nbsp; Upload Profile Image
                </label>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-neutral-200">First name</label>
                    <div className="mt-2">
                        <input type="text" name="first_name" onChange={onChange} value={first_name} id="first-name" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"/>
                    </div>
                  
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-neutral-200">Last name</label>
                  <div className="mt-2">
                        <input type="text" name="last_name" onChange={onChange} value={last_name} id="last-name" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"/>
                  </div>
                  
                </div>
            </div>
            <div>
                <label htmlFor="work" className="block text-sm font-medium leading-6 text-neutral-200">Work</label>
                <div className="mt-2">
                  <input id="work" name="work" onChange={onChange} value={work} type="work" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"/>
                </div>                
            </div>
            <div>
                <label htmlFor="education" className="block text-sm font-medium leading-6 text-neutral-200">Education</label>
                <div className="mt-2">
                  <input id="education" name="education" onChange={onChange} value={education} type="education" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"/>
                </div>                
            </div>
            <div className="flex space-x-4">
                <div className="w-12">
                    <label htmlFor="age" className="block text-sm font-medium leading-6 text-neutral-200">Age</label>
                    <div className="mt-2">
                    <input type="text" name="age" onChange={onChange} value={age} id="age" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div className="w-32">
                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-neutral-200">Country</label>
                    <div className="mt-2">
                    <input type="text" name="country" onChange={onChange} value={country} id="country" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6" />
                    </div>
                </div>
                {imageError && <p className="text-red-500">{imageError}</p>}
            </div>

            <button
              type="submit"
              className="inline-block rounded-full bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white border"
            >
              <span class="material-symbols-outlined">
                upload
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
