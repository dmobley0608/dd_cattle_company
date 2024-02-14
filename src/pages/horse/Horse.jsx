import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, Outlet, NavLink } from "react-router-dom";
import styles from "./Horse.module.css";
import Loading from "../../components/loading/Loading";
import { getHorseByName, selectHorse, selectIsLoading } from "../../features/horses/horsesSlice";
import MustangBrand from "./components/mustangBrand/MustangBrand";
import AboutHorse from "./AboutHorse";
import HorseGallery from "./HorseGallery";
import HorseJournal from "./HorseJournal";




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
  }, [dispatch, horseName])

  return (
    <div className={styles["horse-page"] + " fade-in"}>
      {!isLoading ? (
        <>
          <div className={styles['horse-container']}>
            <h1>{horse.name}</h1>
            {horse.brand && <MustangBrand brand={horse.brand} />}
            <AboutHorse />
            <hr/>
            <HorseGallery horse={horse}/>
            <HorseJournal />
          </div>

        </>
      ) : (
        <Loading />
      )}{" "}
    </div>
  );
}
