import React from "react";
import { Link } from "react-router-dom";
import s from '../Styles/LandingPage.module.css'
import video from '../Media/Video.mp4'
import img from '../Media/button.png'

export default function LandingPage(){
    return (
        <div className={s.landingPage}>
            <video muted autoPlay loop>
                <source src={video} type="video/mp4"/>
            </video>
            <div className={s.button}>
            <Link to='/home'>
                <button><img src={img} alt=''/> </button>
            </Link>
            </div>
        </div>
    )
}