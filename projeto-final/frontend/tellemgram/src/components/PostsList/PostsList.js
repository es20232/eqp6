import React from "react";
import styles from "./PostsList.module.css";
import { useQuery } from "react-query";
import { useAuth } from "../../AuthContext";
import { api, endpoints } from "../../apiService";
import Post from "./Post";
import CircularProgress from "@mui/material/CircularProgress";

const PostsList = () => {
  const { verifyTokenExpirationTime } = useAuth();

  const { isLoading, data: postsList } = useQuery(
    ["postsListQuery"],
    async () => {
      try {
        await verifyTokenExpirationTime();
        const response = await api.get(endpoints.posts);
        console.log(response.data);
        return response.data;
      } catch (error) {}
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className={styles.postsListContainer}>
      {isLoading || !postsList? (
        <CircularProgress color="inherit" size="50px" />
      ) : (
        postsList
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((post, index) => (
            <React.Fragment key={post.post_id}>
              <Post postDataFromList={post} />
              {index < postsList.length - 1 && (
                <hr className={styles.horizontalDivider} />
              )}{" "}
            </React.Fragment>
          ))
      )}
    </div>
  );
};

export default PostsList;
