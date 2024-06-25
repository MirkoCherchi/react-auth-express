// CardPost.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

function CardPost({ title, img, content, category, tags, slug, onDelete }) {
  const fallbackImgUrl = "https://placehold.co/600x400";
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete(slug);
    setShowModal(false);
  };

  return (
    <div className="post-card">
      <h2>{title}</h2>
      {img ? (
        <img src={img} alt={title} />
      ) : (
        <img src={fallbackImgUrl} alt="Immagine non disponibile" />
      )}
      <p>{content}</p>
      <p>
        <strong>Categoria:</strong> {category}
      </p>
      <div className="tags">
        <strong>Tags: </strong>
        {tags.map((tag) => (
          <span key={tag.id} className="tag">
            {"#" + tag.name}
          </span>
        ))}
      </div>
      <Link className="read-more" to={`/post/${slug}`}>
        Leggi di più
      </Link>
      <button className="delete-btn" onClick={() => setShowModal(true)}>
        Elimina
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Sei sicuro di voler eliminare questo post?</p>
            <div className="modal-buttons">
              <button className="modal-confirm-btn" onClick={handleDelete}>
                Conferma
              </button>
              <button
                className="modal-cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardPost;
