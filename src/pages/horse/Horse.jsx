import React from "react";
import { useSelector } from "react-redux";

import { useParams, Link, Outlet, NavLink } from "react-router-dom";
import styles from "./Horse.module.css";

import Loading from "../../components/loading/Loading";
import { selectIsLoading } from "../../features/horses/horsesSlice";

export default function Horse() {
  let isLoading = useSelector(selectIsLoading);
  const { horseName } = useParams("horseName");
  const horse = useSelector((state) => state.horses.horses[horseName]);

  const activeStyle = ({isActive})=>isActive ? `${styles['active']} ${styles['nav-link']}` : styles['nav-link']

  return (
    <div className={styles["horse-page"] + " fade-in"}>
      {!isLoading && horse ? (
        <>
          <nav>
            <NavLink className={activeStyle}  to="about">About</NavLink>
            <NavLink className={activeStyle} to="gallery">Gallery</NavLink>
            <NavLink className={activeStyle} to="journal">Riding Journal</NavLink>
          </nav>
          <div className={styles['horse-container']}>
          <Outlet />
          </div>
          
        </>
      ) : (
        <Loading />
      )}{" "}
    </div>
  );
}
