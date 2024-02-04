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
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const Post = ({postIdFromList, idFullPost}) => {
  const { verifyTokenExpirationTime } = useAuth();
  const { postId } = useParams();

  const {
    data: postData,
    isLoading: isPostDataLoading,
    error: postQueryError,
  } = useQuery(
    ["getPostData"],
    async () => {
      try {
        await verifyTokenExpirationTime();
        let id;
        postIdFromList ? id = postIdFromList : id = postId
        const response = await api.get(endpoints.posts + id + "/");
        response.data.created_at = formatDate(response.data.created_at);
        return response.data;
      } catch (error) {
        console.error("Erro durante a busca de dados:", error);
        throw error; // Lançar o erro novamente para que o useQuery o detecte
      }
    },
    { refetchOnWindowFocus: false }
  );

  const postedBy = postData?.user;

  const {
    data: userData,
    isLoading: isUserDataLoading,
    error: userQueryError,
    refetch: refetchUserData,
  } = useQuery(
    ["getUserData"],
    async () => {
      try {
        await verifyTokenExpirationTime();
        const response = await api.get(endpoints.users + postedBy + "/");
        return response.data;
      } catch (error) {
        console.error("Erro durante a busca de dados:", error);
        throw error; // Lançar o erro novamente para que o useQuery o detecte
      }
    },
    { enabled: !!postedBy, refetchOnWindowFocus: false }
  );

  const {
    isLoading: isDeleting,
    error: deleteQueryError,
    refetch,
  } = useQuery(
    ["deletePost"],
    async () => {
      try {
        await verifyTokenExpirationTime();
        const response = await api.delete(endpoints.posts + postId + "/");
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Erro durante a busca de dados:", error);
        throw error; // Lançar o erro novamente para que o useQuery o detecte
      }
    },
    { enabled: false }
  );

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const newDate = new Date(date).toLocaleDateString("pt-BR", options);
    return newDate;
  };

  return (
    <div className={styles.pageContent}>
      <div className={styles.postContainer}>
        {!userData ? (
          <Skeleton variant="rectangular" width="100%" height="48px" />
        ) : (
          <div className={styles.headerContainer}>
            <Link className={styles.link} to={"/perfil/" + userData?.username}>
              <div className={styles.userInfoContainer}>
                <div className={styles.userImageContainer}>
                  <Avatar
                    alt={!isUserDataLoading ? userData?.first_name : undefined}
                    color="secondary"
                    sx={{
                      bgcolor: "secondary.main",
                      color: "primary.main",
                      fontWeight: "bold",
                      fontSize: "26px",
                      width: 48,
                      height: 48,
                    }}
                    src={
                      !isUserDataLoading
                        ? `data:image/png;base64,${userData?.profile_image}`
                        : ""
                    }
                    className="user-image"
                  />
                </div>
                <span className={styles.usernameContainer}>
                  {userData?.username}
                </span>
              </div>
            </Link>
            <span className={styles.date}>{postData?.created_at}</span>
          </div>
        )}
        {isPostDataLoading ? (
          <Skeleton variant="rectangular" width="476px" height="476px" />
        ) : (
          <div className={styles.imageContainer}>
            {postData.post_image ? (
              <img
                className={styles.image}
                src={"data:image/png;base64," + postData?.post_image}
              />
            ) : (
              "Postagem sem foto"
            )}
          </div>
        )}
        {isPostDataLoading ? (
          <Skeleton variant="rectangular" width="100%" height="20px" />
        ) : (
          <div className={styles.iconsContainer}>
            <div className={styles.likesAndComments}>
              <div className={styles.likes}>
                <div className={styles.likesIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="1 1 22 22"
                  >
                    <path
                      fill="currentColor"
                      d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"
                    />
                  </svg>
                </div>

                <span>{postData?.number_of_likes} curtidas</span>
              </div>
              <div className={styles.comments}>
                <div className={styles.commentsIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="1 1 22 22"
                  >
                    <path
                      fill="currentColor"
                      d="M12 23a1 1 0 0 1-1-1v-3H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.1l-3.7 3.71c-.2.18-.44.29-.7.29zm-9-8H1V3a2 2 0 0 1 2-2h16v2H3z"
                    />
                  </svg>
                </div>

                <span>8 comentários</span>
              </div>
            </div>
            <div className={styles.editDelete}></div>
          </div>
        )}
        {isPostDataLoading ? (
          <Skeleton variant="rectangular" width="100%" height="100px" />
        ) : (
          <div className={styles.captionContainer}>
            <Link className={styles.linksUnderlineHover}to={"/perfil/" + userData?.username}> <span className={styles.captionUsername}>{userData?.username}</span></Link>
            <span>{": " + postData?.caption}</span>
          </div>
        )}
        <div className={styles.commentsContainer}>Comentarios</div>
        {/* <TextField
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
        </Button> */}
      </div>
    </div>
  );
};

export default Post;
