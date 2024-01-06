import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import NotFoundPage from "./NotFoundPage";
import resetPasswordApi from "../api/resetPasswordApi";

const PasswordReset = () => {
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { uid, token } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors({
        confirm_password: "Password and Confirm Password do not match.",
      });
      return;
    }
    try {
        await resetPasswordApi(uid, token, password, confirmPassword)
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className="container mx-auto bg-[#f9efeb]">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to={"/"}>
            <img
              className="mx-auto h-10 rounded-full w-auto"
              src="NextNode.png"
              alt="Your Company"
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#4d2c4d]">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 public" onSubmit={onSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
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
                <div className="text-red-600 text-sm">{errors.password}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
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
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-[#4d2c4d] hover:bg-[#92638f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d2c4d]"
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const PasswordResetWrapper = () => {
    const { uid, token } = useParams();
  
    // Check if uid and token are present
    if (uid && token) {
      return <PasswordReset />;
    } else {
      // Render a different component when uid and token are not present
      return <NotFoundPage />;
    }
  };
  
export default PasswordResetWrapper;
