import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");

    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          // On login action
          dispatch(authLogin(userData));
          // console.log("UserData on Login:", userData); // Check if data is correct
        }

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[82vh] md:min-h-[72vh]  ">
      <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-yellow-100 dark:bg-[#1E1E2E] rounded-xl p-6 sm:p-8 md:p-10  hover:border-1 hover:border-orange-400 dark:hover:border-[#454568] transition-all duration-500 ease-in-out">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center dark:text-[#CBD5E1] text-base text-black/60 transition-all duration-500 ease-in-out">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-orange-500 dark:text-[#F97316] transition-all ease-in-out duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              type="email"
              label="Email: "
              placeholder="enter your email "
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              type="password"
              label="password: "
              placeholder="enter password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full  dark:bg-[#F97316] dark:hover:bg-[#F97316] transition-all duration-500 ease-in-out"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
