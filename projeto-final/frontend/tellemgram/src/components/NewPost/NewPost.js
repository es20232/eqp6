import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { api, endpoints } from "../../apiService";
import Button from "@mui/material/Button";
import styles from "./NewPost.module.css";

const NewPost = () => {
  const hiddenFileInput = useRef(null);
  const [processing, setProcessing] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [formData, setFormData] = useState({
    caption: "",
    image: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // await verifyTokenExpirationTime();
      const response = await api.post(endpoints.createPost, formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setProcessing(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result.split(",")[1],
        }));
        setIsReady(true);
      };

      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  const handleInputClick = (event) => {
    hiddenFileInput.current.click(); // ADDED
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.profileContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div onClick={handleInputClick} className={styles.imageContainer}>
            {formData.image ? (
              <img
                className={styles.image}
                src={"data:image/png;base64," + formData.image}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                Clique aqui para escolher uma imagem
              </div>
            )}

            {/* <div className={styles.postPlaceholder}></div> */}
          </div>
          <input
            ref={hiddenFileInput} // ADDED
            type="file"
            accept="image/jpeg, image/png"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <TextField
            required
            label="Descrição"
            variant="outlined"
            multiline
            maxRows={4}
            rows={2}
            placeholder="Escreva aqui"
            name="caption"
            onChange={handleChange}
            value={formData.caption}
            sx={{ width: "100%" }}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={processing}
            sx={{ width: "100%", height: "3rem" }}
          >
            {processing && <CircularProgress color="inherit" size="2rem" />}
            {!processing && <>POSTAR</>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
