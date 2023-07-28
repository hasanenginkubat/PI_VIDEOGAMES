import React,{useState, useEffect} from "react";
import style from "./About.module.css";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getVideogames } from "../redux/actions/index";
import Loading from "../loading/Loading";
import turkeyFlag from "../imagenes/turkeyFlag.png";
import spainFlag from "../imagenes/spainFlag.png";
import Github from '../imagenes/Github.png';
import Linkedin from '../imagenes/linkedin.png';

export const About = () => {

   const dispatch = useDispatch();
  const [carga, setCarga] = useState(true);
  const [language, setLanguage] = useState("tr"); 

  const turkishExplanation = "React, Redux, Node.js, Express ve SQL teknolojilerini kullanarak geliştirdiğim Game API’si ile işverenlere bilgi, tecrübe ve yaratıcılığımı göstermeyi amaçlıyorum. Bu projede zihinsel olarak büyük ilerleme kaydettim ve yaratıcılığımı geliştirdim. Gelecekteki projelerimde bu tecrübelerimi kullanarak daha profesyonel işler ortaya koyacağıma inanıyorum. Bu projem sayesinde IT sektöründe bir iş bulma şansımı arttırmayı umuyorum";
  const spanishExplanation = "Con mi API de videogames desarrollada utilizando tecnologías React, Redux, Node.js, Express y SQL, mi objetivo es mostrar a los empleadores mi conocimiento, experiencia y creatividad. En este proyecto, logré un gran progreso mental y desarrollé mi creatividad. Creo que en mis proyectos futuros utilizaré estas experiencias para producir trabajos más profesionales. Espero aumentar mis posibilidades de encontrar un trabajo en el sector de TI gracias a este proyecto.";

  
  useEffect(() => {
    dispatch(getVideogames()).then(() =>setCarga(false));
  }, [dispatch]);


  if(carga){
    return (
      <div className={style.cargaDiv}>
        <Loading/>
      </div>
    )
  }

    return (
      <div className={style.allDiv}>
      <h1>Engin KUBAT</h1>
      <button className={style.button} onClick={() => setLanguage(language === "tr" ? "es" : "tr")}>
  {language === "tr" ? (
    <img src={turkeyFlag} alt="Turkey Flag" width="50" />
  ) : (
    <img src={spainFlag} alt="Spain Flag" width="50" />
  )}
</button>
<div className={style.p}>
<p>{language === "tr" ? turkishExplanation : spanishExplanation}</p>
</div>
      <div className={style.div1}>
        <h1>GitHub</h1>
        <a
          href="https://github.com/hasanenginkubat"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Github} alt="Github" width="100" />
        </a>
      </div>
      <div className={style.div2}>
        <h1>Linkedin</h1>
        <a
          href="https://www.linkedin.com/in/hasan-engin-kubat-621173255/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Linkedin} alt="Linkedin" width="100" />
        </a>
      </div>
      <div className={style.containerButton}>
                <NavLink className={style.detailButton} to={"/home"}>
                  Home
                </NavLink>
            </div>
    </div>
  );
}
            
           


