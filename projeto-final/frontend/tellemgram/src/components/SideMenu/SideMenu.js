import React, { useEffect, useState } from "react";
import styles from "./SideMenu.module.css";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";

import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Cookies from "js-cookie";
import { useQuery } from 'react-query';
import { api, endpoints } from "../../apiService";



const SideMenu = () => {
  const { verifyTokenExpirationTime } = useAuth();
  const { logout } = useAuth();

  const { data, error, isLoading } = useQuery('getMyData', async() => {
    await verifyTokenExpirationTime();
    const response = await api.get(endpoints.users + Cookies.get("myUserName") + "/");
    return response.data;
  },{refetchOnWindowFocus: false});

  const logoutButtonHandler = () => {
    logout();
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.appTitle}>Tellemgram</h1>
      <div className={styles.userInfoContainer}>
        <div className={styles.userImageContainer}>
          <Avatar
            alt={!isLoading ? data.first_name : undefined}
            color="secondary"
            sx={{
              bgcolor: "secondary.main",
              color: "primary.main",
              fontWeight: "bold",
              fontSize: "26px",
              width: 48,
              height: 48,
            }}
            src={!isLoading ? `data:image/png;base64,${data && data.profile_image}` : ''}
            className="user-image"
          />
        </div>
        <div className={styles.userNameContainer}>
          {isLoading && <Skeleton variant="text" width={100} height={45} />}
          {!isLoading && data.first_name}
        </div>
      </div>
      <div className={styles.menuLinksContainer}>
        <Link className={styles.link} to="nova-postagem/">
          <div className={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="2 2 20 20"
            >
              <path
                fill="currentColor"
                d="M22 5v2h-3v3h-2V7h-3V5h3V2h2v3Zm-3 14H5V5h6V3H5a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2v-6h-2Z"
              />
            </svg>
          </div>
          <span className={styles.textContainer}>Nova postagem</span>
        </Link>

        <Link className={styles.link} to="postagens/">
          <div className={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="2 2 20 20"
            >
              <path
                fill="currentColor"
                d="M8 5.5h8a3 3 0 0 0 3-3a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5a3 3 0 0 0 3 3m-3 6c0-1.886 0-2.828.586-3.414C6.172 7.5 7.114 7.5 9 7.5h6c1.886 0 2.828 0 3.414.586C19 8.672 19 9.614 19 11.5v1c0 1.886 0 2.828-.586 3.414c-.586.586-1.528.586-3.414.586H9c-1.886 0-2.828 0-3.414-.586C5 15.328 5 14.386 5 12.5zm11 7H8a3 3 0 0 0-3 3a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5a3 3 0 0 0-3-3"
              />
            </svg>
          </div>
          <span className={styles.textContainer}>Postagens</span>
        </Link>

        <Link className={styles.link} to="perfil/">
          <div className={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="2 1 20 20"
            >
              <path
                fill="currentColor"
                d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.39 3.39 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.39 3.39 0 0 0 15 11a3.5 3.5 0 0 0 0-7"
              />
            </svg>
          </div>
          <span className={styles.textContainer}>Usuários</span>
        </Link>

        <Link className={styles.link} to="meu-perfil/">
          <div className={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="2 2 20 20"
            >
              <g fill="none">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M20 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-3 12H7a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2m-7-8H8a2 2 0 0 0-1.995 1.85L6 9v2a2 2 0 0 0 1.85 1.995L8 13h2a2 2 0 0 0 1.995-1.85L12 11V9a2 2 0 0 0-1.85-1.995zm7 4h-3a1 1 0 0 0-.117 1.993L14 13h3a1 1 0 0 0 .117-1.993zm-7-2v2H8V9zm7-2h-3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2"
                />
              </g>
            </svg>
          </div>
          <span className={styles.textContainer}>Meu perfil</span>
        </Link>
      </div>
      <button className={styles.logoutButton} onClick={logoutButtonHandler}>
        <div className={styles.iconContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="2 2 20 20"
          >
            <path
              fill="currentColor"
              d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
            />
          </svg>
        </div>
        <span className={styles.textContainer}>Sair</span>
      </button>
    </div>
  );
};

export default SideMenu;
