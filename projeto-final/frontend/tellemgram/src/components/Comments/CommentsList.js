import React, { useState } from "react";
import styles from "./CommentsList.module.css";

import Comment from "./Comment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";

import { api, endpoints } from "../../apiService";
import { useMutation, useQuery } from "react-query";
import { useAuth } from "../../AuthContext";

const CommetsList = ({ postId, userId, setCommentsNumber }) => {
  const { verifyTokenExpirationTime } = useAuth();

  const {
    isLoading: isCommentsListLoading,
    data: commentsList,
    refetch,
  } = useQuery(
    ["commetsListQuerry", postId],
    async () => {
      try {
        await verifyTokenExpirationTime();
        const response = await api.get(endpoints.comments + postId);
        console.log(response.data);
        setCommentsNumber(response.data.length);
        return response.data;
      } catch (error) {}
    },
    { refetchOnWindowFocus: false }
  );

  const [formData, setFormData] = useState({
    text: "",
    user: userId,
    post: postId,
    likes: [],
    dislikes: [],
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return api.post(endpoints.comments + postId + "/", data);
    },
    onSuccess: (data, variables, context) => {
      console.log(data);
      setFormData((prevData) => ({
        ...prevData,
        text: "",
      }));
      refetch();
    },
  });

  const newCommentHandler = async (event) => {
    await verifyTokenExpirationTime();
    event.preventDefault();
    mutation.mutateAsync(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.commentsContainer}>
      {isCommentsListLoading ? (
        <Skeleton variant="rectangular" width="100%" height="50px" />
      ) : commentsList.length !== 0 ? (
        <div className={styles.publishedCommentsContainer}>
          {commentsList
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((comment, index) => (
              <React.Fragment key={comment.comment_id}>
                <Comment data={comment} />
              </React.Fragment>
            ))}
        </div>
      ) : null}
      <div className={styles.newCommentContainer}>
        <TextField
          required
          label="Novo Comentário"
          variant="outlined"
          multiline
          minRows={2}
          placeholder="Escreva aqui seu comentário"
          name="text"
          onChange={handleChange}
          value={formData.text}
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          disabled={mutation.isLoading}
          onClick={newCommentHandler}
          sx={{ width: "100%", height: "3rem" }}
        >
          {mutation.isLoading && (
            <CircularProgress color="inherit" size="2rem" />
          )}
          {!mutation.isLoading && <>POSTAR COMENTÁRIO</>}
        </Button>
      </div>
    </div>
  );
};

export default CommetsList;
