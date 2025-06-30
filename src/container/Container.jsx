import React from "react";

// it is just a box like a div, if we want to change the container size etc we can change from here
function Container({ children }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
      {children}
    </div>
  );
}

export default Container;
