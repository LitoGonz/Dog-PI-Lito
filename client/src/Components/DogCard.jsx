import React from "react";
import { Link } from "react-router-dom";
import s from '../Styles/dogCard.module.css'

 export default function DogCard({id,image, name, temperament, weight}) {
   
let kg = `${weight[0]}lbs - ${weight[1]} lbs`

    return (
        
        <div className={s.dogCardContainer}>
            
            <Link className={s.link} to={`/home/${id}`} >
            <h3>{name}</h3>
            <img  className={s.image} src={image} alt />
            </Link>
            <div className={s.stats}>
            <u>
                <b>
                    <span>Temperaments: </span>
                </b>
            </u>
            <br></br>
            <ul>
             {temperament?.map((e)=>{
               return(<li>{e}</li>)
             })}
             </ul>
            <br></br>
            <u>
                <b>
                    <span>Weight: </span>
                </b>
            </u>
            <br></br>
            <ul className={s.weights}>
                    <li>{kg}</li>
             </ul>
            </div>
        </div>
    )
 }
