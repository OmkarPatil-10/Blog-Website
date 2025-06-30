import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configg";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    console.log(userData);
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="border flex flex-col justify-center items-center mb-4 relative rounded-xl p-2">
          <div className="shadow-sm hover:shadow-[0_25px_45px_rgba(0,0,0,0.2)] transition-shadow duration-600 mb-5">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-xl rounded hover:w-[580px] transition-w duration-200 "
            />
          </div>

          {isAuthor && (
            <div className="">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="mr-3 transition duration-[0.25s] hover:bg-green-600"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                className="transition duration-[0.25s] hover:bg-red-600 "
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col p-4 rounded-md border-1 border-[#ffed29] bg-[#fffed8] justify-between items-center mb-4">
          <div className="w-full mb-6">
            <h1 className="text-2xl underline font-bold">{post.title}</h1>
          </div>
          <div className="browser-css text-start">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}
