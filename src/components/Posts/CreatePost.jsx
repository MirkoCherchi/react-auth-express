import React, { useState } from "react";
import NewPostForm from "./NewPostForm";

const CreatePost = () => {
  const [postData, setPostData] = useState(null);

  const handleNewPostCreated = (newPostData) => {
    setPostData(newPostData);
  };

  return (
    <div>
      <h1>Crea un nuovo post</h1>
      <NewPostForm onNewPostCreated={handleNewPostCreated} />
      {postData && (
        <div>
          <h2>Post Creato con Successo!</h2>
          <p>ID: {postData.id}</p>
          <p>Title: {postData.title}</p>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
