import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import LoginValidation from "./../hooks/LoginValidation";
import { AuthContext } from "../context/AuthContextProvider";
import toast from "react-hot-toast";

export default function Login() {
  let userInfo = { username: "", password: "" };
  let success = false;
  const { authuser, setAuthuser } = useContext(AuthContext);

  function loginValidation(e) {
    e.preventDefault();
    success = LoginValidation(userInfo);
    console.log(userInfo, success);
    if (success) {
      login(userInfo);
    }
  }

  async function login(userInfo) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo), // No need to manually pick fields, send entire userInfo object
      });

      // console.log(userInfo);

      // Check if the response is successful
      if (!res.ok) {
        // Assuming the server returns error messages in JSON format
        // console.log(res);
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to login up"); // Throw error with server message or default message
      }

      const data = await res.json();
      console.log(userInfo, data);
      localStorage.setItem("user-chat", JSON.stringify(data));
      setAuthuser(data);
    } catch (error) {
      toast.error(error.message); // Display appropriate error message
    }
  }

  return (
    <div
      className="flex flex-col justify-center items-center h-screen flex-wrap w-screen overflow-hidden"
      // style={{
      //   backgroundImage: `url(${backgroundImage})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <div className=" w-4/12 bg-white/0 shadow-lg backdrop-blur rounded-2xl">
        <div className=" text-3xl text-center">
          Login <span className=" text-blue-700">Messenger</span>
        </div>
        <div className=" m-4 w-full  ">
          <form className="max-w-sm mx-auto">
            {/* <div className="mb-5">
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                required
              />
            </div> */}
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="johndoe"
                onChange={(e) => (userInfo.username = e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="••••••••"
                onChange={(e) => (userInfo.password = e.target.value)}
              />
            </div>
            {/* <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="••••••••"
              />
            </div> */}
            {/* <div className="flex items-start mb-5 gap-2">
              <div className="flex items-center h-5">
                <input
                  id="male"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
                <label
                  htmlFor="male"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Male
                </label>
              </div>

              <div className="flex items-center h-5">
                <input
                  id="female"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
                <label
                  htmlFor="female"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Female
                </label>
              </div>
            </div> */}
            <div className=" text-sm text-gray-500 dark:text-gray-400 h-8 hover:underline">
              {/* <a id="helper-text-explanation" href="">
                Don't have an account?
              </a> */}
              <NavLink to={"/signup"}>Don't have an account?</NavLink>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => {
                loginValidation(e);
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
