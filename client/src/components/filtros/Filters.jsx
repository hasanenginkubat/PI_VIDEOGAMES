import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getByGenres,} from "../redux/actions/index";
import style from "../filtros/Filter.module.css"


 const FilterBar = ({handleSortByName, handleFilterGenres, handleSortByRating, handleFilterCreated}) => {
 const dispatch = useDispatch();
 const allGenres = useSelector((state) => state.listGenres);

 

 useEffect(() => {
  dispatch(getByGenres());
}, [dispatch]);

 

return (
    <div className={style.filters}>
        <select className={style.options} onChange={(event) => handleSortByName(event)}>

          <option  value="asc">Ascendente</option>

          <option  value="desc">Descendente</option>

        </select>

        <select className={style.options} onChange={(event) => handleFilterGenres(event)}>
          <option>Generos</option>
          {
               allGenres.map((g) => {
              return (
                <option key={g.id} value={g.name} >{g.name}</option>
              )
            })
          }
        </select> 


        <select className={style.options}  onChange={(event) => handleSortByRating(event)}>

          <option  value="best">Best Rating</option>

          <option  value="worst">Worst Rating</option>

        </select>
        
        <select className={style.options} onChange={(event) => handleFilterCreated(event)}>
            
            <option value="All">All</option>
            <option value="createdInDb">Created</option>
            <option value="api">Existents</option>

        </select>
    </div>
)

}

export default FilterBar;