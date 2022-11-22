import React from "react"
import { useState } from "react"
import {useDispatch} from 'react-redux'
import { getDogName } from "../Redux/Actions"

export default function SearchBar(){
  const dispatch = useDispatch();
  const [name, setName] = useState('')  
 
  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
  }
   
  function handleSubmit(e){
    e.preventDefault();
    dispatch(getDogName(name));
    setName('')
  }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
            <input 
            value={name}
            type='text'
            placeholder='Search Dog'
            onChange={e => handleInputChange(e)}
            />
        <button type='submit'>Search</button>
        </form>
        </div>
    )
}
