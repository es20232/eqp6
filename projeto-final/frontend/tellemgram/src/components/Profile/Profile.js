import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();

  return (
    <div className="edit-profile">
      <h1>Perfil do usuário: {userId}</h1>
    </div>
  );
};

export default Profile;
