import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  postGame,
  getByGenres,
  getPlatform,
} from "../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import s from "../gamecreate/GameCreate.module.css"
import Loading from "../loading/Loading";

const validate = (input) => {
    let errors = {};
      if(!input.name) {
        errors.name = 'The name is required';
      } else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
        errors.name = 'Only letters, numbers, hyphens, and parentheses are accepted.';
      }
      else if(input.name.length > 50){
        errors.name = "The name is too long";
      };

// || !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.background_image)
      if(!input.background_image.length || !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(input.background_image)
      ){
        errors.background_image='invalid URL, must be an image(png, jpg, gif)';
      };


      if(!input.description) {
        errors.description = 'The description is required';
      } else if (input.description.length > 800) {
        errors.description = 'The description is very long. (Max = 800 characters)';
      };

      
      
      
      if(!input.released){
        errors.released = 'Creation date is required';
    }else if (input.released.length < 10 ) {
        errors.released = "Enter released data: yyyy-mm-dd";
      }
      if( input.released.length > 10 || !/^[0-9-]+$/.test(input.released)) {
       errors.released = "A valid date is required (yyyy-mm-dd)"
     } 
     


    if(!input.rating) {
        errors.rating = 'The rating is required';
      } else if(input.rating > 5) {
        errors.rating = 'The rating should not be higher than 5';
      } else if(input.rating < 1.0) {
        errors.rating = 'The rating cannot be less than 1.0';
      };

    return errors;
}

const GameCreate = () => {
            const dispatch = useDispatch();
            const navigate = useNavigate();
            const allGenres = useSelector((state) => state.listGenres);
            const allPlatforms = useSelector((state) => state.platforms);
            const nameList = useSelector((state) => state.listGames);
            
            const [carga, setCarga] = useState(true);
            const [input, setInput] = useState({
                 name: "",
                 background_image: "",
                 description: "",
                 released: "",
                 rating: "",
                 genres: [],
                 platforms: [],
            });

            const [errors, setErrors] = useState({});

  useEffect(() => {
    // dispatch(getVideogames());
    dispatch(getByGenres()).then(() =>setCarga(false));
    dispatch(getPlatform());
  }, [dispatch]);


  const handleSubmit = (event) => {
    event.preventDefault();
    let noRepeat = nameList.filter((n) => n.name === input.name);
    if(noRepeat.length){
        alert("There is already a game with that name");
        errors.name = "There is already a game with that name";
    }else {
        let error = Object.keys(validate(input));
        if(error.length || !input.genres.length || !input.platforms.length ){
            alert("missing complete data")
            errors.genres = "missing complete data";
            error.platforms = "missing complete data";
        }
        else {
            dispatch(postGame(input))
        alert("Character created");
        setInput({
            name: "",
            background_image: "",
            description: "",
            released: "",
            rating: "",
            genres: [],
            platforms: [], 
        })
        navigate('/home')
        }
    } 
    
  };

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(validate({
       ...input,
       [event.target.name]: event.target.value, 
    }))
  };

  const handlePlatform = (event) => {
     
     if(event.target.value === "all"){
      return 
     }
      setInput({
        ...input,
        platforms: [...new Set([...input.platforms, event.target.value ])],
      });
    
    
  };

  const handleDeletePlatform = (event) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((p) => p !== event),
    });
  };

  const handleGenre = (event) => {
    setInput({
      ...input,
      genres: [...new Set([...input.genres, event.target.value])],
    });
  };

  const handleDeleteGenre = (event) => {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== event),
    });
  };

  if(carga){
    return (
      <div className={s.cargaDiv}>
        <Loading/>
      </div>
    )
  }

  return (
    <div className={s.containerPadre}>

      <div className={s.subContainer}>
      <div className={s.firstContainerForm}>
      <NavLink  to="/home">   
        <button className={s.buttonForm}>
          Home
        </button>
      </NavLink>
      
      
      <div className={s.containerForm}>

      <h1 className={s.titulo}>Create your game!</h1>

      <form className={s.form} onSubmit={ (event ) => handleSubmit(event)}>
        <div>
          <div className={s.labelname}>
          <label>Name: </label>
          </div>
          <input className={s.thisInput}
            type="text"
            value={input.name}
            name="name"
            onChange={(event) => handleChange(event)}
          ></input>
          {
            errors.name && (
                <p className={s.red}>{errors.name}</p>
            )
          }
        </div>

        <div>
        <div className={s.labeldes}>
          <label>Description: </label>
          </div>
          <textarea className={s.textArea}
            type="text"
            value={input.description}
            name="description"
            onChange={(event) => handleChange(event)}
          />
          {
            errors.description && (
                <p className={s.red}>{errors.description}</p>
            )
          }
        </div>

        <div>
          <div className={s.labelrelase}>
          <label>Date: </label>
          </div>
          <input className={s.thisInput}
            type="text"
            placeholder="yyyy-mm-dd"
            value={input.released}
            name="released"
            onChange={(event) => handleChange(event)}
          ></input>
           {
            errors.released && (
                <p className={s.red}>{errors.released}</p>
            )
          }
        </div>

        <div>
          <div className={s.labelrating}>
          <label>Rating: </label>
          </div>
          <input className={s.thisInput}
            type="number"
            value={input.rating}
            name="rating"
            onChange={(event) => handleChange(event)}
          ></input>
           {
            errors.rating && (
                <p className={s.red}>{errors.rating}</p>
            )
          }
        </div>

        <div>
          <div className={s.labelimg}>
          <label>ImagenUrl: </label>
          </div>
          <input className={s.thisInput}
            type="text"
            value={input.background_image}
            name="background_image"
            onChange={(event) => handleChange(event)}
          ></input>
          {
            errors.background_image && (
                <p className={s.red}>{errors.background_image}</p>
            )
          }
        </div>
        
        <div>
          <div className={s.platform}>
          <label>Plataforms: </label>
          </div>
          <select className={s.thisInput} onChange={(event) => handlePlatform(event)}>
            <option value="all">All</option>
            {allPlatforms?.map((p) => {
              return (
                <option key={p} value={p}>
                  {p}
                </option>
              );
            })}
          </select>
          </div>
          <div className={s.selected}>
          
          {input.platforms.map((p) => (
            <div key={p}>
              <p>{p}</p>
              <button
                onClick={() => handleDeletePlatform(p)}
                key={p.id}
                id={p.id}
                value={p.name}
              >
                <span>X</span>
              </button>
            </div>
          ))}
        </div>

        <div>
          <div className={s.labelgeners}>
          <label>Geners: </label>
          </div>
          <select className={s.thisInput} onChange={(event) => handleGenre(event)}>
            <option value="all">All</option>
            {allGenres?.map((g) => {
              return (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              );
            })}
          </select>
          </div>
          <div className={s.selected}>
          {input.genres.map((g) => (
            <div key={g}>
              <p>{g}</p>
              <button
                onClick={() => handleDeleteGenre(g)}
                key={g.id}
                id={g.id}
                value={g.name}
              >
                <span>X</span>
              </button>
            </div>
          ))}
          </div>
       

        {Object.keys(errors).length ? (
            <div className={s.formDiv}>
              <input className={s.buttonForm} type="submit" disabled name="Send" />
            </div>
          ) : (
            <div className={s.formDiv}>
              <input className={s.buttonForm} type="submit"   name="Send" />
            </div>
          )}
      </form>
      </div>
      </div>
      </div>
      
    </div>
  );
};

export default GameCreate;