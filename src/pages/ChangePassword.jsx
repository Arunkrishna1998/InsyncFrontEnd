import React, { useState } from "react";
import { Link } from "react-router-dom";

import changePasswordApi from "../api/changePasswordApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../components/Layout";

const ChangePassword = () => {
  const [errors, setErrors] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation to exclude spaces in all fields
    if (
      oldPassword.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setErrors({ general: "Please fill in all fields." });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({
        confirm_password: "Password and Confirm Password do not match.",
      });
      return;
    }

    // Check for spaces in any of the fields
    if (
      oldPassword.includes(" ") ||
      password.includes(" ") ||
      confirmPassword.includes(" ")
    ) {
      setErrors({
        spaces: "Spaces are not allowed in any of the fields.",
      });
      return;
    }
    if (password.length < 8) {
        setErrors({
          password: "Password must be at least 8 characters long.",
        });
        return;
    }

    try {
      // Call the changePasswordApi function here
      await changePasswordApi(oldPassword, password);

      // Handle the response, e.g., show a success message
      toast.success("Password changed successfully!");

      // Optionally, you can reset the form fields here
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);

      // Handle errors, e.g., show an error message
      toast.error("An error occurred while changing the password.");
    }
  };

  return (
    <Layout>
      <main className="flex-1">
        <div className="relative mx-auto px-8 mt-16">
          <div className="pt-10 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-[#000000]">
                Settings
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-6">
                <div className="lg:hidden">
                  <label for="selected-tab" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="selected-tab"
                    name="selected-tab"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  >
                    <option>Manage Posts</option>

                    <option selected>Profile</option>

                    <option>Change Password</option>
                  </select>
                </div>
                <div className="hidden lg:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      <Link
                        to={"/settings"}
                        className="border-transparent cursor-pointer text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                      >
                        {" "}
                        Manage Posts{" "}
                      </Link>

                      <p className="border-purple-500 cursor-pointer text-purple-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                        {" "}
                        Profile{" "}
                      </p>

                      <p className="border-transparent cursor-pointer text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                        {" "}
                        Change Password{" "}
                      </p>
                    </nav>
                  </div>
                </div>

                <div className="mt-10 divide-y divide-gray-200">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-[#000000]">
                      Change Password
                    </h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                      Change your password.
                    </p>
                  </div>
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6 public" onSubmit={onSubmit}>
                      <div>
                        <label
                          htmlFor="old_password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Old Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="old_password"
                            name="old_password"
                            onChange={(e) => setOldPassword(e.target.value)}
                            value={oldPassword}
                            type="password"
                            required
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.confirm_password && (
                          <div className="text-red-600 text-sm">
                            {errors.confirm_password}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            New Password
                          </label>
                          <div className="text-sm"></div>
                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            required
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.password && (
                          <div className="text-red-600 text-sm">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="confirm_password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Confirm New Password
                        </label>
                        <div className="mt-2">
                          <input
                            id="confirm_password"
                            name="confirm_password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            type="password"
                            required
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors.confirm_password && (
                          <div className="text-red-600 text-sm">
                            {errors.confirm_password}
                          </div>
                        )}
                        {errors.spaces && (
                          <div className="text-red-600 text-sm">
                            {errors.spaces}
                          </div>
                        )}
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-[#000000] hover:bg-[#000000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d2c4d]"
                        >
                          Change
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </Layout>
  );
};

export default ChangePassword;
