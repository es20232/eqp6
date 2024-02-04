import React from "react";
import styles from "./PostsList.module.css";
import { useQuery } from "react-query";
import { useAuth } from "../../AuthContext";
import { api, endpoints } from "../../apiService";
import Post from "./Post";
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
      {!isLoading && postsList.map((post, index) => (<Post key={post.post_id} postDataFromList={post}/>))}
      {/* {!isLoading && postsList.map((post, index) => (<span>{post.post_id}</span>))} */}
    </div>
  );
};

export default PostsList;
