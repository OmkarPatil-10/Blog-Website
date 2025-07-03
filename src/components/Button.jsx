import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-orange-500",

  className = "",
  ...props
}) {
  return (
    <button
      type={`${type}`}
      className={`inline-bock px-6 py-2 duration-200 rounded-full ${className} ${bgColor} text-[#1E293B] dark:bg-[#F97316] dark:text-[#F8FAFC]`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
