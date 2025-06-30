import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/configg";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (Array.isArray(posts)) {
        setPosts(posts);
      } else {
        setPosts([]);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex justify-center items-center">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts :)
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.$id} className="p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
export default Home;

// import React, { useEffect, useState } from "react";
// import appwriteService from "../appwrite/configg";
// import { Container, PostCard } from "../components";

// function Home() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     appwriteService.getPosts().then((posts) => {
//       if (posts) {
//         setPosts(posts.documents);
//       }
//     });
//   }, []);

//   if (posts.length === 0) {
//     return (
//       <div className="w-full py-8 mt-4 text-center">
//         <Container>
//           <div className="flex justify-center">
//             <h1 className="text-2xl font-bold hover:text-gray-500">NO POSTS</h1>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full py-8">
//       <Container>
//         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {posts.map((post) => (
//             <div key={post.$id} className="p-2">
//               <PostCard {...post} />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default Home;
