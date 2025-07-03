import React from "react";
import appwriteService from "../appwrite/configg";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, content, $createdAt }) {
  const strippedContent = parse(content.replace(/<[^>]+>/g, "")); // Remove HTML tags
  const truncatedContent =
    strippedContent.length > 150
      ? strippedContent.substring(0, 150) + "..."
      : strippedContent;

  const createdDate = new Date($createdAt);
  const formattedDate = createdDate.toLocaleString("en-US", {
    year: "numeric", // 2025
    month: "short", // Jan
    day: "numeric", // 1
    hour: "2-digit", // 12
    minute: "2-digit", // 30
  });

  return (
    <Link to={`/post/${$id}`}>
      {/* {console.log(appwriteService.getFileView(featuredImage))} */}
      <div className="w-full bg-[#fffed8] dark:bg-[#2A2A3B] rounded-xl p-3 flex flex-col justify-between h-[370px] border border-[#ffed29] dark:border-[#3B3B54]  hover:border-2 hover:shadow-lg dark:hover:shadow-[#334155] dark:hover:shadow-lg transition-all duration-500 ease-in-out">
        <div className="w-full h-[200px] flex justify-center items-center overflow-hidden rounded-lg ">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-fill rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-[#F8FAFC] line-clamp-2  transition-all duration-500 ease-in-out">
          {title}
        </h2>{" "}
        {/* Limit title to 2 lines */}
        <div className="text-gray-600 dark:text-[#CBD5E1] text-sm  line-clamp-2  transition-all duration-500 ease-in-out">
          {truncatedContent}
        </div>{" "}
        {/* Limit content to 3 lines */}
        <div className="text-blue-600 dark:text-blue-400 text-[12px] text-right transition-all duration-500 ease-in-out ">
          {formattedDate}
        </div>{" "}
        {/* Display date */}
      </div>
    </Link>
  );
}

export default PostCard;
