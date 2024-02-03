import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { api, endpoints } from "../../apiService";
import Button from "@mui/material/Button";
import styles from "./Post.module.css";
import { useQuery } from "react-query";
import { useAuth } from "../../AuthContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";


const Post = () => {
  const { verifyTokenExpirationTime } = useAuth();
  const { postId } = useParams();
  const [processing, setProcessing] = useState(false);
  const {
    data: postData,
    isLoading: isPostDataLoading,
    error: postQueryError,
  } = useQuery(["getPostData"], async () => {
    try {
      await verifyTokenExpirationTime();
        const response = await api.get(endpoints.posts + postId + "/");
        console.log(response.data);
        return response.data;
    } catch (error) {
      console.error("Erro durante a busca de dados:", error);
      throw error; // Lançar o erro novamente para que o useQuery o detecte
    }
  });

  const {
    isLoading: isDeleting,
    error: deleteQueryError,
    refetch,
  } = useQuery(["deletePost"], async () => {
    try {
      await verifyTokenExpirationTime();
        const response = await api.delete(endpoints.posts + postId + "/");
        console.log(response.data);
        return response.data;
    } catch (error) {
      console.error("Erro durante a busca de dados:", error);
      throw error; // Lançar o erro novamente para que o useQuery o detecte
    }
  }, {enabled: false});

  return (
    <div className={styles.pageContent}>
      <div className={styles.profileContainer}>
        <div className={styles.form}>
          <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={"data:image/png;base64," + postData?.image}
              />

          </div>
          <TextField
            required
            label="Descrição"
            variant="outlined"
            multiline
            rows={2}
            disabled
            value={postData?.caption}
            placeholder="Escreva aqui"
            name="caption"
            sx={{ width: "100%" }}
          />
          <Button
            variant="contained"
            disabled={processing}
            sx={{ width: "100%", height: "3rem" }}
            onClick={refetch}
          >
            APAGAR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
