import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import {useParams} from 'react-router-dom';
import {showDogDetails} from '../Redux/Actions';
import { Link } from "react-router-dom";
import s from '../Styles/detail.module.css'



export default function Detail(){

const dispatch = useDispatch()

let { id } = useParams();

const details = useSelector((state) => state.details)
const detail = details[0];

let lbs = `${detail?.weight[0]}lbs - ${detail?.weight[1]} lbs`
let inches = `${detail?.height[0]}inches - ${detail?.height[1]} inches`


useEffect(() => {
    dispatch(showDogDetails(id));
},[]);



if (Object.keys(details).length = 0) {
return (
    <div>
        <h2>Dog not Found</h2>
    </div>
)
}

    return(
    <div className={s.rootDiv}>
        <Link to='/home'>
                <button className={s.return}> Return Home</button>
        </Link>
        <div>
            <div className={s.div}>

                <div className={s.imageContainer}>
                    <img className={s.image} src={detail?.image} alt='' width='700px' height='500px'/>
                </div>
                        
                <div className={s.details}>
                    <h1>Breed: {detail?.name}</h1>
                    <h3>Height: {inches} </h3>
                    <h3>Weight: {lbs} </h3>
                    <h3>Life Span: {detail?.life_span}</h3>
                    <div>
                       <h4>Temperaments: 
                        <br></br>
                        {!detail?.createdInDb ? detail?.temperament + ' ' : detail?.temperaments.map(e => e.name + ', ')}
                        </h4>
                    </div>
                </div>   
            </div>
        </div>  
    </div>
    )
}