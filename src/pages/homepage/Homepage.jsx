import React from 'react'
import styles from './Homepage.module.css'
import { Link } from 'react-router-dom'
export default function Homepage() {
    return (
        <div className={styles['homepage']}>
            {/* About Section */}
            <section id="about">
                <h1>Double D Cattle Company</h1>
                <p className={styles['description']}>Founded by David Jones and Dwight Mobley. Friends for over 15 years and partners for life.
                    That sounds gay. They are not gay. They both have women. And they like them. They do not like wieners. Well, they like hotdogs.
                    Anyways, I digress....</p>
            </section>
            {/* Two Column Image Layout */}
            <section id="profiles" className={styles['two-col']}>
                <div className={styles['col']}>
                    <img src="https://ik.imagekit.io/7a4ad0swj/ddc/Henry/20220219_150256_xufv0y.jpg" alt="david-img" />
                    <p className={styles['description']}>
                        David has had a passion for animals all of his life. He is pictured above desensitizing his newest mustang, Henry. 
                        More information on Henry can be found <Link to="/horses/Henry">Here</Link>
                    </p>
                </div>
                <div className={styles['col']}>
                    <img src="https://ik.imagekit.io/7a4ad0swj/ddc/Jett/jlsmeok2vcrcmsaglicg.jpg" alt="dwight-img" />
                    <p className={styles['description']}>
                    Dwight has also had a passion for animals since a very early age. He can be seen above working with Jett. 
                    He is currently working with a new mustang, Titus. More information on Titus can be found <Link to="/horses/Titus">Here</Link>
                    </p>
                </div>
            </section>
        </div>
    )
}
