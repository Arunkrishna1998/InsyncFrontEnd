import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/user";
import insyncbgi from '../assets/insyncbgi.jpg'

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { registered, loading } = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});

  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
  });

  const { first_name, last_name, age, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors({ confirm_password: "Password and Confirm Password do not match." });
      return;
    }

    dispatch(register({ first_name, last_name, email, age, password })).then(
      (response) => {
        if (response.error) {
          console.log(response.payload);
          setErrors(response.payload);
        }
      }
    );
  };

  if (registered) return <Navigate to="/" />;

  return (
    <div className="container mx-auto bg-[#fae4db]">
      {errors.general && (
        <div className="text-red-600 text-center mt-4 text-sm">
          {errors.general}
        </div>
      )}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" style={{border:'2px solid black', borderRadius:'2%'}}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
 
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#000000]">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
          <form className="space-y-6 public" onSubmit={onSubmit}>
            <div>
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
              </div>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first_name"
                      onChange={onChange}
                      value={first_name}
                      id="first-name"
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.first_name && (
                    <div className="text-red-600 text-sm">
                      {errors.first_name}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last_name"
                      onChange={onChange}
                      value={last_name}
                      id="last-name"
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.last_name && (
                    <div className="text-red-600 text-sm">
                      {errors.last_name}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <div className="sm:col-span-2 sm:col-start-1 w-12 ">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Age
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="age"
                      onChange={onChange}
                      value={age}
                      id="age"
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.age && (
                    <div className="text-red-600 text-sm">{errors.age}</div>
                  )}
                </div>
              </div>
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
                  onChange={onChange}
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
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#000000] sm:text-sm sm:leading-6"
                />
              </div>
              {errors.confirm_password && (
                <div className="text-red-600 text-sm">
                  {errors.confirm_password}
                </div>
              )}
            </div>

            {loading ? (
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-[#000000] hover:bg-[#000000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000000]"
                >
                  Register
                </button>
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link
              to={"/"}
              className="font-semibold leading-6 text-[#000000] hover:text-[#000000]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
