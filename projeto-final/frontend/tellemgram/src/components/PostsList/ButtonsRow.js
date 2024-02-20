import React, { useState } from "react";

import Cookies from "js-cookie";
import { api, endpoints } from "../../apiService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../AuthContext";

import styles from "./ButtonsRow.module.css";

const ButtonsRow = ({
  ILiked,
  IDisliked,
  setIDisliked,
  setILiked,
  likes,
  dislikes,
  comments,
  postedBy,
  postId,
  setIsDeleting,
}) => {
  const { verifyTokenExpirationTime } = useAuth();
  const client = useQueryClient();
  const navigate = useNavigate();

  // Like
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!ILiked) {
        setILiked(true);
        await verifyTokenExpirationTime();
        return api.post(endpoints.posts + postId + "/like/", {
          post_id: postId,
        });
      } else {
        throw new Error("Você já curtiu esta postagem.");
      }
    },
    onSuccess: async (data, variables, context) => {
      console.log("dei like");
      client.refetchQueries(["postsListQuery"]);
    },
    onError: (error, variables, context) => {
      console.error("Erro ao dar like:", error.message);
    },
  });

  // Dislike
  const dislikeMutation = useMutation({
    mutationFn: async () => {
      if (!IDisliked) {
        setIDisliked(true);
        await verifyTokenExpirationTime();
        return api.post(endpoints.posts + postId + "/dislike/", {
          post_id: postId,
        });
      } else {
        throw new Error("Você já descurtiu esta postagem.");
      }
    },
    onSuccess: async (data, variables, context) => {
      console.log("dei dislike");
      client.refetchQueries(["postsListQuery"]);
    },
    onError: (error, variables, context) => {
      console.error("Erro ao dar dislike:", error.message);
      // Tratar o erro aqui, se necessário
    },
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await verifyTokenExpirationTime();
      return api.delete(endpoints.posts + postId);
    },
    onSuccess: async (data, variables, context) => {
      console.log("excluindo");
      setIsDeleting(true);
      await client.refetchQueries(["postsListQuery"]);
      setIsDeleting(false);
      navigate("/");
    },
  });
  return (
    <div className={styles.iconsContainer}>
      <div className={styles.likesAndComments}>
        <div className={styles.button} onClick={likeMutation.mutate}>
          <div className={styles.likesIcon}>
            {ILiked ? (
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
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="1 1 22 22"
              >
                <path
                  fill="currentColor"
                  d="M5 9v12H1V9zm4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21zm0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03z"
                />
              </svg>
            )}
          </div>

          <span>{likes}</span>
        </div>

        <div className={styles.button} onClick={dislikeMutation.mutate}>
          <div className={styles.likesIcon}>
            {IDisliked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="1 1 22 22"
              >
                <g transform="rotate(180 12 12)">
                  <path
                    fill="currentColor"
                    d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"
                  />
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="1 1 22 22"
              >
                <g transform="rotate(180 12 12)">
                  <path
                    fill="currentColor"
                    d="M5 9v12H1V9zm4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21zm0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03z"
                  />
                </g>
              </svg>
            )}
          </div>

          <span>{dislikes}</span>
        </div>

        <div className={styles.button}>
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

          <span>{comments} comentários</span>
        </div>
      </div>
      {postedBy == Cookies.get("myUserId") ? (
        <div className={styles.button} onClick={deleteMutation.mutate}>
          <div className={styles.commentsIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="1 1 22 22"
            >
              <path
                fill="currentColor"
                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
              />
            </svg>
          </div>

          <span>Excluir</span>
        </div>
      ) : null}
    </div>
  );
};

export default ButtonsRow;
