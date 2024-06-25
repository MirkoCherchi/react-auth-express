import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_API_URL;
const fallbackImgUrl = "https://placehold.co/600x400";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/posts/${slug}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Errore:", error));
  }, [slug]);

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="post-container">
      <h2>{post.title}</h2>
      {post.img ? (
        <img src={post.img} alt={post.title} className="post-image" />
      ) : (
        <img src={fallbackImgUrl} alt={post.title} className="post-image" />
      )}
      <div className="post-content">{post.content}</div>
      <div className="post-meta">
        <p>
          <strong>Published on:</strong>{" "}
          {new Date(post.createAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Category:</strong> {post.category.name}
        </p>
        <div className="post-tags">
          <strong>Tags: </strong>
          {post.tags.map((tag) => (
            <span key={tag.id} className="tagSingle">
              {"#"} {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
