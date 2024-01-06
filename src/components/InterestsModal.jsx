import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import getTagsApi from "../api/getTagsApi";
import createInterestsApi from "../api/createInterestsApi";

const InterestsModal = ({ isVisible, onClose }) => {
  const { user } = useSelector((state) => state.user);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTagsApi();
        setTags(data.tags);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const handleTagChange = (tag) => {
    const isSelected = selectedTags.includes(tag);
  
    if (isSelected) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  

  const sendSelectedTags = async () => {
    try {
      await createInterestsApi(selectedTags);
      onClose();
      toast.success("Interests updated successfully!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error sending selected tags:", error);
    }
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-50 z-10 p-2 backdrop-blur-md flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button onClick={onClose} className="text-white text-xl place-self-end">
          X
        </button>
        <div className="bg-[#000000] p-2 karla rounded flex flex-wrap">
          <form onSubmit={sendSelectedTags}>
            <h2 className="text-white text-lg">Select Your Interests</h2>
            <div className="flex flex-wrap">
              {tags && tags.length > 0 ? (
                tags.map((tag) => (
                  <span key={tag.id} className="flex items-center mr-4 mb-2">
                    <input
                      type="checkbox"
                      id={tag.id}
                      value={tag.name}
                      checked={selectedTags.includes(tag.name)}
                      onChange={() => handleTagChange(tag.name)}
                      className="mr-1"
                    />
                    <label htmlFor={tag.id} className="text-white ml-1">
                      {tag.name}
                    </label>
                  </span>
                ))
              ) : (
                <p>No tags available.</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 bg-[#3f4fff] text-white px-4 py-2 border-white border rounded hover:bg-blue-700"
            >
              Save Interests
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterestsModal;
