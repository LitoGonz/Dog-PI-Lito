import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';

import { getAllDogs,
    getTemperaments,
    filterByTemperament,
    orderByName,
    orderByWeight,
    filterDogByCreated
} from "../Redux/Actions";

import { Link } from "react-router-dom";
import DogCard from './DogCard'
import Paginado from "./Paginado";
import s from '../Styles/home.module.css'
import video from '../Media/Video2.mp4'
import SearchBar from "./SearchBar";
import DogCreate from "./DogCreate";
import Navbar from "./Navbar";

export default function Home(){

const dispatch = useDispatch()
const allDogs = useSelector((state) => state.dogs)

const allTemperaments = useSelector(state => state.temperaments)

const tempsFromCreated = allDogs.temperaments?.map(e => e.name + ', ')


const [currentPage,setCurrentPage] = useState(1) 
const [dogsPerPage,setCurrentDog] = useState(8); 
const indexOfLastDog = currentPage * dogsPerPage;  
const indexOfFirstDog = indexOfLastDog - dogsPerPage;
const currentDogs = allDogs?.slice(indexOfFirstDog,indexOfLastDog)

const [AZ,setAZ] = useState('');

const [order,setOrder] = useState('');

const paginado = (pageNumbers) => {
    setCurrentPage(pageNumbers)
}

useEffect(()=> {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
},[dispatch]);

function handleClick(e){
e.preventDefault();
dispatch(getAllDogs());
};

const handleFilterByTemperaments = (e) => {
    e.preventDefault();  
    dispatch(filterByTemperament(e.target.value))
    dispatch(orderByName(AZ))
    setCurrentPage(1);
};

const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
};

const handleFilterDogByCreated = (e) => {
    e.preventDefault();
    dispatch(filterDogByCreated(e.target.value))
}

const handleSort = (e) => {
e.preventDefault();
dispatch(orderByName(e.target.value));
setCurrentPage(1);
setOrder(`Ordered${e.target.value}`)
};

return (
<div className={s.rootDiv}>
    
            <video className={s.video2} muted autoPlay loop>
                <source src={video} type="video/mp4"/>
            </video>


    <Navbar/>


   

    <div className={s.filtros}>
        
    <button  onClick={e=>{handleClick(e)}}>
        Reload Breeds
    </button>
            <div className={s.razas}>
        <span>Filter Breeds by Origin</span>
            <select onChange={(e) => handleFilterDogByCreated(e)}>
                <option value = 'all'>All</option>
                <option value = 'created'>Created</option>
                <option value = 'exists'>Exists</option>
            </select>
            </div>
            <div className={s.orderA}>
        <span>Order by Alphabet</span>
            <select onChange={(e) => {
                handleSort(e)
                setAZ(e.target.value)
                }}>
                <option selected disabled>Choose an Option</option>
                <option value='asc'>A-Z</option>
                <option value='dec'>Z-A</option>
            </select>
            </div>
            <div className={s.orderW}>
        <span>Ordenar by Weight</span>
            <select onChange={(e) => handleOrderByWeight(e)}>
                <option selected disabled>Choose an Option</option>
                <option value='max_weight'>Max to Min</option>
                <option value='min_weight'>Min to Max</option>
            </select>
            </div>
            <div className={s.temperamentos}>
            <span>Order by Temperaments</span>
            <select onChange={handleFilterByTemperaments}>
                  <option selected disabled>Choose an Option</option>
                  <option value="Todos">All</option>
                  {
                    allTemperaments?.map(e => (
                        <option value={e.name}  key={e.id}> {e.name} </option>
                    ))
                  }
              </select>
            </div>
    </div>              
            
        <div className={s.DogCardContainer}>
    {
      currentDogs?.map( e => {
        return (
            <div>
                <DogCard 
                id = {e.id} 
                name={e.name} 
                image={e.image} 
                temperament={e.temperament || tempsFromCreated} 
                weight={e.weight}
                />
        </div>
        )
      })
      
    }
    </div>

    <Paginado
            dogsPerPage = {dogsPerPage}
            allDogs = {allDogs}
            paginado = {paginado}
        />

</div>

)

}
