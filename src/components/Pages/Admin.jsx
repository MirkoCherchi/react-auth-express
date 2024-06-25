import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Admin = () => {
  const { user } = useContext(AuthContext);

  const userName = user ? user.name : "";

  return (
    <div className="adminContainer">
      <h2 className="adminTitle">
        Area Amministrativa{userName && ` di ${userName}`}
      </h2>

      <p className="adminDescription">
        {userName
          ? `Benvenuto, ${userName}!`
          : `Benvenuto nell'area amministrativa del blog! Devi effettuare il Login.`}
      </p>
    </div>
  );
};

export default Admin;
