import React from "react";
import styles from "./Error.module.css"
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const Error = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <PriorityHighIcon className={styles.icon} />
      </div>
      <h1>Erro 404</h1>
      <p>Página não encontrada</p>
    </div>
  );
};

export default Error;
