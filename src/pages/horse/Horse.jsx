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

  return (
    <div className={styles["horse-page"] + " fade-in"}>
      {!isLoading && horse ? (
        <>
          <nav>
            <NavLink className={'nav-link'} to="about">About</NavLink>
            <Link to="gallery">Gallery</Link>
            <Link to="journal">Riding Journal</Link>
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
