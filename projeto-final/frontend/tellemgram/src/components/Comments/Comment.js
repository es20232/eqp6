import React from "react";
import styles from "./Comment.module.css";

import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";


import { Link } from "react-router-dom";
import { api, endpoints } from "../../apiService";
import { useQuery } from "react-query";
import { useAuth } from "../../AuthContext";

const Comment = ({ data }) => {
  const { verifyTokenExpirationTime } = useAuth();
  const { isLoading: isAuthorLoading, data: authorData } = useQuery(
    ["authorQuery", data.user],
    async () => {
      try {
        await verifyTokenExpirationTime();
        const response = await api.get(endpoints.users + data.user);
        console.log(response.data);
        return response.data;
      } catch (error) {}
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <div className={styles.commentContainer}>
      {isAuthorLoading ? (
        <Skeleton variant="rectangular" width="100%" height="48px" />
      ) : (
        <>
          <div className={styles.authorProfileImageContainer}>
            <div className={styles.authorProfileImage}>
              <Link
                className={styles.link}
                to={"/perfil/" + authorData?.username}
              >
                <Avatar
                  alt={!isAuthorLoading ? authorData?.first_name : undefined}
                  color="secondary"
                  sx={{
                    bgcolor: "secondary.main",
                    color: "primary.main",
                    fontWeight: "bold",
                    fontSize: "26px",
                    width: "100%",
                    height: "100%",
                  }}
                  src={
                    !isAuthorLoading
                      ? `data:image/png;base64,${authorData?.profile_image}`
                      : ""
                  }
                />
              </Link>
            </div>
          </div>
          <div className={styles.text}>
            <Link
              className={styles.link}
              to={"/perfil/" + authorData?.username}
            >
              {authorData?.username}
            </Link>
            <span>{": " + data?.text}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
