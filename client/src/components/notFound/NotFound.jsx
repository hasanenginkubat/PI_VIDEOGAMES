import img404 from "../imagenes/404.gif"
import { NavLink } from "react-router-dom";
import s from "../notFound/NotFound.module.css"


export const NotFound = () => {




    return (
        <div>
             <div className={s.containerButton}>
                <NavLink className={s.detailButton} to={"/home"}>
                     Home
                </NavLink>
            </div>
           <img className={s.image} src={img404} alt="404notfound"/> 
        </div>
    )
};