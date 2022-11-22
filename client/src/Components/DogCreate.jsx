import React from 'react';
import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {postDog,getTemperaments } from "../Redux/Actions";
import {useDispatch, useSelector} from "react-redux";
import s from '../Styles/form.module.css'

const validate = (form) => {
    let errors = {}
    if(!form.name) {
        errors.name = "Name is required, it should not contain numbers"
    }
    if(form.min_height)

    if(!form.min_height || !form.max_height) {
        errors.height = "Height is required"
    }
    if(!form.min_weight || !form.max_weight) {
        errors.weight = "Weight is required"
    }
    if(!form.life_span) {
        errors.life_span = "Lifespan is required, type only numbers separated by a dash (-)"
    }
    return errors
}



export default function DogCreate(){
const dispatch = useDispatch();
const temperaments = useSelector((state) => state.temperaments)

const [button, setButton] = useState(true);
const [errors, setErrors] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span:  "",
    image: "",
});

const [form, setForm] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span:  "",
    image: "",
    temperaments: [],
})

useEffect(() => {
    dispatch(getTemperaments());
},[dispatch]);

useEffect(()=>{
    if (form.name.length > 0 && form.min_height.length > 0  && form.max_height.length > 0 && form.min_weight.length > 0 && form.max_weight.length > 0) setButton(false)
    else setButton(true)
}, [form, setButton]);

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(form));
    alert("The new dog was added successfully");    
    setForm({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperaments: []
    });
}

const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name] : e.target.value 
    });
    setErrors(validate({
        ...form,
        [e.target.name] : e.target.value
    }))
}

const handleSelect = (e) => {
    setForm({
        ...form,
        temperaments: [...form.temperaments, e.target.value]
    })
}

const handleDelete = (el) => {
    setForm({
        ...form,
        temperaments: form.temperaments.filter(temp => temp !== el)
    })
}


return(
        <div className={s.rootDiv}>
        <Link to= '/home'>
            <button className={s.return}>Return Home</button>
        </Link>

        <h1 className={s.title}>Create your Dog!</h1>
        
        <form className={s.form} action="" id="form" onSubmit={handleSubmit}>
            <div>
                <input
                type='text'
                value={form.name}
                name='name'
                onChange={(e) => handleChange(e)} 
                placeholder='Name your dog...'
                />
            </div>
            <div>{errors.name && <p>{errors.name}</p>}</div>

            <div>
                <div>
                    <input type='number' value={form.min_height} name='min_height' 
                    placeholder="Min height..." onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <input type="number" value={form.max_height} name="max_height"
                    placeholder="Max height..." onChange={(e) => handleChange(e)}/>
                </div>
            </div>
            <div>{errors.height && <p>{errors.height}</p>}</div>
            
            <div>
                <div>
                    <input type="number" value={form.min_weight} name="min_weight" 
                    placeholder="Min weight..." onChange={(e) => handleChange(e)}/>
                </div>

                <div>
                    <input type="number" value={form.max_weight} name="max_weight" 
                    placeholder="Max weight..." onChange={(e) => handleChange(e)}/>
                </div>
            </div>
            <div>{errors.weight && <p>{errors.weight}</p>}</div>

            <div className="life-span-container">
                    <input type="text" autoComplete="off" name="life_span" value={form.life_span} 
                    placeholder="lifespan example: 10 - 12" onChange={(e) => handleChange(e)}/>
            </div>
                <div>{errors.life_span && <p>{errors.life_span}</p>}</div>

            <div className="image-container">
                    <input type="text" autoComplete="off" value={form.image} name="image" 
                    placeholder="Image URL..." onChange={(e) => handleChange(e)}/>
            </div>

            <div >
                <h3>Select Temperaments</h3>
            </div>

            <div>
                <select onChange={handleSelect}>
                    <option disabled selected>Temperaments</option>
                        {temperaments.map(d => (                    
                            <option value={d.name} key={d.name+Math.random()}>{d.name}</option> 
                            ))}
                </select>
            </div>

            <div>
                <button disabled={button} type="submit" form="form">Create Dog</button>
            </div>

        </form>
        <div className={s.div2}>
                    <div className="">
                        <h3>Temperaments : </h3>
                    </div>

                    <div>
                        {form.temperaments.map(el => 
                        <div key={el} onClick={() => handleDelete(el)}>
                            <p className={s.p}>{`${el}`}</p>
                        </div>    
                        )}
                    </div>
                </div>
            </div>
    
)

}