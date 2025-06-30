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
      <div className="w-full bg-[#fffed8] rounded-xl p-3 flex flex-col justify-between h-[370px] border border-[#ffed29] transition-all hover:border-2 hover:shadow-lg">
        <div className="w-full h-[200px] flex justify-center items-center overflow-hidden rounded-lg ">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-fill rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800  line-clamp-2 ">
          {title}
        </h2>{" "}
        {/* Limit title to 2 lines */}
        <div className="text-gray-600 text-sm  line-clamp-2 ">
          {truncatedContent}
        </div>{" "}
        {/* Limit content to 3 lines */}
        <div className="text-blue-600 text-[12px] text-right ">
          {formattedDate}
        </div>{" "}
        {/* Display date */}
      </div>
    </Link>
  );
}

export default PostCard;
