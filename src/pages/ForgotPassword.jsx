import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import forgotPasswordApi from "../api/forgotPasswordApi";

const ForgotPassword = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const onChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    validateEmail(inputEmail); // Call the email validation function
  };

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(inputEmail)) {
      setErrors({ email: "Invalid email address" });
    } else {
      setErrors({}); // Clear the error message if the email is valid
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!errors.email) {
      try {
        await forgotPasswordApi(email);
        setSuccessMessage("Email sent successfully. Please check your mailbox.");
        // Redirect to the homepage after a successful email send
        setTimeout(() => {
          navigate("/");
        }, 3000); // Redirect after 3 seconds (adjust as needed)
      } catch (error) {
        console.error(error);
        setErrors({ email: "Bad Request. Please check your email address." });
        // Handle other API errors here
      }
    }
  };
  

  return (
    <div className="container mx-auto bg-[#f9efeb]">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to={"/"}>
            {/* <img
              className="mx-auto h-10 rounded-full w-auto"
              src="NextNode.png"
              alt="Your Company"
            /> */}
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#000000]">
            Forgot Password?
          </h2>
          <p className="mt-5 text-center">Please enter email address</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 public" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  onChange={onChange}
                  value={email}
                  type="email"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <div className="text-red-600 text-sm">{errors.email}</div>
              )}
              {successMessage && (
                <div className="text-green-600 text-center mt-4 text-sm">
                  {successMessage}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-[#000000] hover:bg-[#000000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d2c4d]"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
