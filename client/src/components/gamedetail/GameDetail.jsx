import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteGame } from "../redux/actions/index";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Loading from "../loading/Loading"
import s from "../gamedetail/GameDetail.module.css";
const GameDetail = (props) => {
  const [carga, setCarga] = useState(true);

  const dispatch = useDispatch();
  const {id} = useParams();
  const detail = useSelector((state) => state.gameDetail);
  const navigate = useNavigate();
  

  useEffect(() => {
    dispatch(getDetail(id)).then(() => setCarga(false)).catch(() => {
      alert("Game not found")
      window.location.replace("http://localhost:3000/home")
    });
  }, [dispatch, id]);

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteGame(id));
    alert("Game removed");
    navigate("/home");
  };
  

  if (carga) {
    return (
     <Loading/>   
    )
  }

  var html = /(<([^#$>]+)>)/gi;

  return (
    <div className={s.containerPadre}>
      <div className={s.containerButton}>
        <NavLink className={s.detailButton} to={"/home"}>
          Home
        </NavLink>
      </div>
      
      <div className={s.containerMain} 
      key={detail.id}>
        <div
          className={s.containerImg}
          key={detail.id}
          style={{
            backgroundImage: `url(${
              detail.image ? detail.image : detail.background_image
            })`,
          }}
        >
           <img
            src={detail.image ? detail.image : detail.background_image}
            alt={detail.name}
          /> 
        </div>
        <div className={s.containerTextDescrip}>
            <div className={s.nameDiv}>
            <h1>{detail.name}</h1>
            </div>
           

          <div className={s.containerGenPlat}>
           
            <p>Geners: {detail.genres?.map((e) => e.name).join(", ")}</p>

            <p>
              Plataforms:{" "}
              {typeof detail.platforms === "object"
                ? detail.platforms.map((e) => e).join(", ")
                : detail.platforms.split(",").join(", ")}
            </p>
          </div>

          <div className={s.ratingAndReleased}>
            <p>Rating: {detail.rating}</p>
            <p>Date: {detail.released}</p>
          </div>

          <div className={s.descriptionText}>
            <p>
            Description:
              {detail.description?.replace(html, "")}
            </p>
          </div>
        
      </div>
      </div>
      
        {
             <div className={s.containerDelete}> 
            <button className={s.buttonDel} onClick={(event) => handleDelete(event)}>Delete</button>
          </div>
        } 
    </div>
  );
};


export default GameDetail;