import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const createAcc = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/login");
      }
    } catch (error) {}
  };
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-yellow-100 dark:bg-[#1E1E2E] rounded-xl p-6 sm:p-8 md:p-10 hover:border-1 hover:border-orange-400  dark:hover:border-[#454568] transition-all duration-500 ease-in-out">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base transition-all duration-500 ease-in-out text-black/60 dark:text-[#CBD5E1]">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold  text-orange-500  dark:text-[#F97316] transition-all ease-in-out duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form className="mt-5" onSubmit={handleSubmit(createAcc)}>
          <div className="space-y-5 ">
            <Input
              label="Full Name: "
              type="text"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email"
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
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full dark:bg-[#F97316] dark:hover:bg-[#FF7310]"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
