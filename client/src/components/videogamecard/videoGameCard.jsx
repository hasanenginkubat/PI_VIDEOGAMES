import React from 'react';
import style from "../videogamecard/GameCard.module.css";

export const VideoGameCard = ({name, image, genres, id, rating }) => {


    return (
        <div id={id} key={id} className={style.containerDiv}>
            <div id={id} key={id} className={ style.containerCard}  >
             <div className={style.textDiv}>
             <h3 className={style.text}>{name}</h3>
              <h4 className={style.text}>Genres: {genres}</h4>
              <h5 className={style.text}>Rating: {rating}</h5>
              
             </div>
              
            <div className={style.imageDiv }>
              <img src={image} alt="IMG GAME" className={style.image}/>
            </div>
            
            </div> 
        </div>
    )
}