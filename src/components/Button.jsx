import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-orange-500",
  textColor = "#1E293B",
  className = "",
  ...props
}) {
  return (
    <button
      type={`${type}`}
      className={`inline-bock px-6 py-2 duration-200  rounded-full ${className} ${bgColor} ${textColor}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
