import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-[#000000] dark:text-[#e2e8f0] transition-all duration-500 ease-in-out"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white dark:bg-[#2A2A3B] text-black dark:text-[#F8FAFC] outline-none focus:bg-gray-50 dark:focus:bg-gray-950 border border-gray-200 dark:border-gray-800 w-full transition-all duration-500 ease-in-out ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
