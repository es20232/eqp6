import React, { useState, useEffect, useRef } from "react";
import { api, endpoints } from "../../apiService";

import styles from "./Post.module.css";
import { useQuery } from "react-query";
import { useAuth } from "../../AuthContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

import CommetsList from "../Comments/CommentsList";
import ButtonsRow from "./ButtonsRow";
import Cookies from "js-cookie";

const Post = ({ postDataFromList }) => {
  const { verifyTokenExpirationTime } = useAuth();
  const { postId } = useParams();

  const [isDeleting, setIsDeleting] = useState(false);
  const [ILiked, setILiked] = useState(false);
  const [IDisliked, setIDisliked] = useState(false);
  const [commentsNumber, setCommentsNumber] = useState(0);

  const {
    data: postData,
    isLoading: isPostDataLoading,
    error: postQueryError,
  } = useQuery(
    ["getPostData", postDataFromList, postId],
    async () => {
      try {
        if (postDataFromList) {
          const modifiedPostData = { ...postDataFromList };
          modifiedPostData.created_at = formatDate(modifiedPostData.created_at);

          return modifiedPostData;
        } else {
          await verifyTokenExpirationTime();
          const response = await api.get(endpoints.posts + postId + "/");
          response.data.created_at = formatDate(response.data.created_at);
          return response.data;
        }
      } catch (error) {
        console.error("Erro durante a busca de dados:", error);
        throw error; // Lançar o erro novamente para que o useQuery o detecte
      }
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if(postData){
    if (postData.likes.includes(parseInt(Cookies.get("myUserId"), 10))) {
      setILiked(true);
    } else {
      setILiked(false);
    }
    if (postData.dislikes.includes(parseInt(Cookies.get("myUserId"), 10))) {
      setIDisliked(true);
    } else {
      setIDisliked(false);
    }}
  }, [postData]);

  const postedBy = postData?.user;

  const {
    data: userData,
    isLoading: isUserDataLoading,
    error: userQueryError,
    refetch: refetchUserData,
  } = useQuery(
    ["getUserData", postedBy],
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

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const newDate = new Date(date).toLocaleDateString("pt-BR", options);
    return newDate;
  };
  // userData
  return (
    <div className={styles.postContainer}>
      {isDeleting ? (
        <div style={{ textAlign: "center" }}>Excluindo...</div>
      ) : (
        <>
          {!userData ? (
            <>
              <Skeleton variant="rectangular" width="100%" height="48px" />
              <Skeleton variant="rectangular" width="476px" height="476px" />
              <Skeleton variant="rectangular" width="100%" height="20px" />
              <Skeleton variant="rectangular" width="100%" height="100px" />
            </>
          ) : (
            <>
              <div className={styles.headerContainer}>
                <Link
                  className={styles.link}
                  to={"/perfil/" + userData?.username}
                >
                  <div className={styles.userInfoContainer}>
                    <div className={styles.userImageContainer}>
                      <Avatar
                        alt={
                          !isUserDataLoading ? userData?.first_name : undefined
                        }
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
              {postData ? (
                <>
                  {postDataFromList ? (
                    <>
                      <Link
                        className={styles.link}
                        to={"/postagem/" + postData?.post_id}
                      >
                        {postData?.post_image ? (
                          <div className={styles.imageContainer}>
                            <img
                              className={styles.postImage}
                              src={
                                "data:image/png;base64," + postData?.post_image
                              }
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </Link>
                    </>
                  ) : (
                    <>
                      {postData?.post_image ? (
                        <div className={styles.imageContainer}>
                          <img
                            className={styles.image}
                            src={
                              "data:image/png;base64," + postData?.post_image
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </>
              ) : (
                <Skeleton variant="rectangular" width="476px" height="476px" />
              )}
              <ButtonsRow
                setILiked={setILiked}
                ILiked={ILiked}
                setIDisliked={setIDisliked}
                IDisliked={IDisliked}
                setIsDeleting={setIsDeleting}
                postId={postData?.post_id}
                postedBy={postedBy}
                dislikes={postData?.number_of_dislikes}
                likes={postData?.number_of_likes}
                comments={postData?.number_of_comments}
              />

              <div className={styles.captionContainer}>
                <Link
                  className={styles.linksUnderlineHover}
                  to={"/perfil/" + userData?.username}
                >
                  {" "}
                  <span className={styles.captionUsername}>
                    {userData?.username}
                  </span>
                </Link>
                <span>{": " + postData?.caption}</span>
              </div>
              {postId && (
                <CommetsList
                  setCommentsNumber={setCommentsNumber}
                  postId={postId}
                  userId={postedBy}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
