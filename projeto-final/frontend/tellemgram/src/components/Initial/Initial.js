import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React from "react";

const Initial = () => {
  return (
    <div style={{ padding: "0px 32px 0px 32px" }} className="initial">
      <h2>Feed</h2>

      <div style={{ textAlign: "center", display: "flex", alignItems:"center", justifyContent: "center", gap: "16px" }}>
        <AddPhotoAlternateIcon sx={{ fontSize: 48, color: "#995C99" }} />
        <label>
          Sem imagens no seu Feed.
          <br />
          Adicione uma foto!
        </label>
      </div>
    </div>
  );
};

export default Initial;
