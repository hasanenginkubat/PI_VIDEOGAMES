import { getVideogamesName } from "../redux/actions/index";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "../SearchBar/SearchBar.module.css"
import load from "../imagenes/oopa.gif"

 export const SearchBar = ({setCurrentPage}) => {
  
    const [searchState, setSearchState] = useState("");
    const dispatch = useDispatch();
    const [carga, setCarga] = useState(false);

        const handleInputChange = (event) =>{
            event.preventDefault();
            setSearchState(event.target.value);
            
           
        };
        const handleSubmit = (event) => {
            event.preventDefault();
            setCarga(true);
            dispatch(getVideogamesName(searchState)).then(() => {
                   setCarga(false);
            })
            setSearchState("");
            setCurrentPage(1);
        }

    return (
        <div className={style.container}>
           
             <input className={style.inputs} 
             value={searchState} type="text" 
             onChange={(event) => handleInputChange(event)}  
             placeholder="Search game by name" />
            
             <button className={style.buttons} 
             type="submit" onClick={(event) => handleSubmit(event)} >Search</button>
             
             <div className={style.Loading}>{carga && <img src={load} alt="Loading" />}</div>
        </div>
    )

};