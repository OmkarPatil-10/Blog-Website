import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-5 bg-yellow-200 dark:bg-[#1E293B] border border-yellow-200 dark:border-[#1E293B] dark:border-t-[#475569] border-t-2 border-t-orange-200">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="w-full p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <div className="inline-flex items-center">
            <Logo width="100px" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm inline-block text-gray-600 dark:text-[#F8FAFC] ">
              &copy; Copyright 2025. All rights reserved by
            </p>{" "}
            <a
              href="https://github.com/OmkarPatil-10/Blog-Website"
              className="no-underline inline-block text-orange-600  hover:text-orange-700 dark:hover:text-orange-500 hover:underline hover:text-bold transition-all duration-500 ease-in-out"
            >
              @Blogzilla
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
