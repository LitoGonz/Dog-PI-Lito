import React from "react";
import s from '../Styles/paginado.module.css'

export default function Paginado({dogsPerPage,allDogs,paginado}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs.length/dogsPerPage);i++) {
      pageNumbers.push(i)
    }


    return(
        <div className={s.rootDiv}>
        <nav className={s.nav}>
            <div className={s.page_button}>
                {pageNumbers?.map(e => {
                    
                return (
                <button key={e} className={s.buttons} onClick={() => paginado(e)}>{e}</button>
                    )

            })}
            </div>
        </nav>
        </div>
    )
}