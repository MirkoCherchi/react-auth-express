import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPost from "./CardPost";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/posts`);
        setPosts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div className="postCard" key={post.id}>
          <CardPost
            title={post.title}
            img={post.img}
            content={post.content}
            category={post.category.name}
            tags={post.tags}
            slug={post.slug}
          />
        </div>
      ))}
    </div>
  );
}

export default Posts;
