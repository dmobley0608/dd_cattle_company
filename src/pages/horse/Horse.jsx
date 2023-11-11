import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, Outlet, NavLink } from "react-router-dom";
import styles from "./Horse.module.css";
import Loading from "../../components/loading/Loading";
import { getHorseByName, selectHorse, selectIsLoading } from "../../features/horses/horsesSlice";
import MustangBrand from "./components/mustangBrand/MustangBrand";




export default function Horse() {
  const isLoading = useSelector(selectIsLoading)  
  const { horseName } = useParams("horseName");
  const horse = useSelector(selectHorse)
  const dispatch = useDispatch()



  const handleHover = () => {
    const subMenu = document.querySelector(`.${styles['sub-menu']}`)
    if (subMenu) {
      subMenu.style.visibility = 'visible'
    }

  }
  const handleExit = () => {
    const subMenu = document.querySelector(`.${styles['sub-menu']}`)
    if (subMenu) {
      subMenu.style.visibility = 'hidden'
    }

  }
  const activeStyle = ({ isActive }) => isActive ? `${styles['active']} ${styles['nav-link']}` : styles['nav-link']

  useEffect(() => {     
    dispatch(getHorseByName(horseName))
  }, [dispatch, horseName, horse.brand])

  return (
    <div className={styles["horse-page"] + " fade-in"}>
      {!isLoading ? (
        <>
          <nav onMouseLeave={handleExit}>
            <NavLink className={activeStyle} to="about">About</NavLink>
            <NavLink id='gallery-nav' onMouseOver={handleHover} className={activeStyle} to="gallery/images">Gallery</NavLink>
            <NavLink className={activeStyle} to="journal">Riding Journal</NavLink>
            <div>
              <ul className={styles["sub-menu"]} onMouseOver={handleHover} onMouseLeave={handleExit} >
                <NavLink className={styles['nav-link']} to={`/horses/${horse.name}/gallery/images`}>Images</NavLink>
                <NavLink className={styles['nav-link']} to={`/horses/${horse.name}/gallery/videos`}>Videos</NavLink>
              </ul>
            </div>
          </nav>
          <div className={styles['horse-container']}>
            <h1>{horse.name}</h1>
            {horse.brand && <MustangBrand brand={horse.brand} />}
            <Outlet />
          </div>

        </>
      ) : (
        <Loading />
      )}{" "}
    </div>
  );
}
