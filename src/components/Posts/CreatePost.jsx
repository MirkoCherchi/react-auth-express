import React, { useContext } from "react";
import axios from "axios";
import NewPostForm from "./NewPostForm";
import { AuthContext } from "../contexts/AuthContext"; // Assicurati che il percorso sia corretto

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const CreatePost = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const handleNewPostCreated = async () => {
    try {
      if (isAuthenticated) {
        const response = await axios.post(`${apiUrl}/posts`, postData);
        console.log("Post creato:", response.data);
      } else {
        console.log("L'utente non è autenticato. Impossibile creare il post.");
      }
    } catch (error) {
      console.error("Errore durante la creazione del post:", error);
    }
  };

  return (
    <div>
      <NewPostForm onNewPostCreated={handleNewPostCreated} />
    </div>
  );
};

export default CreatePost;
