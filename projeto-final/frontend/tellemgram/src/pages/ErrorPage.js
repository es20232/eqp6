import React, { Children } from "react";
import MessageLayout from "../components/MessageLayout/MessageLayout"
import Error from "../components/Error/Error";
const ErrorPage = () => {


  return (
    <MessageLayout>
      <Error/>
    </MessageLayout>
  );
};

export default ErrorPage;
