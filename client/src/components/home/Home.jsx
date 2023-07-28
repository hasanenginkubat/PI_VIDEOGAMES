import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading/Loading";
import { SearchBar } from "../SearchBar/SearchBar";
import { getVideogames, sortByRating, filterCreatedGame, orderByName, filterByGenres} from "../redux/actions/index";
import FilterBar from "../filtros/Filters"
import { VideoGameCard } from "../videogamecard/videoGameCard";
import Paginado from "../paginado/Paginado";
import img404 from "../imagenes/img404.jpg";
import { NavLink } from "react-router-dom";
import s from "./Home.module.css";
import found from "../imagenes/found.jpg"


const Home = (props) => {

  const dispatch = useDispatch();

  const allGames = useSelector((state) => state.listGames);

 

  const [carga, setCarga] = useState(true);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage; 
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  console.log(orden)
  console.log(setGamesPerPage)
  
 const paginado = (pageNumber) => {
  setCurrentPage(pageNumber)
 }

  useEffect(() => {
    dispatch(getVideogames()).then(() =>setCarga(false));
   
  }, [dispatch]);

  
  
  const handleFilterGenres = (event) => {
    event.preventDefault();
    if(event.target.value === "Generos"){
      dispatch(getVideogames());
      setCurrentPage(1);
    }
    else{
      dispatch(filterByGenres(event.target.value));
      setCurrentPage(1);
      setOrden(`Ordered ${event.target.value}`);
    }
  };

  const handleSortByRating = (event) => {
    event.preventDefault();
    dispatch(sortByRating(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordered ${event.target.value}`);
  };
  
  const handleSortByName = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrden(`Ordered ${event.target.value}`); 
  };

  const handleFilterCreated = (event) => {
    event.preventDefault();
    if(event.target.value === "All"){
      dispatch(getVideogames());
      setCurrentPage(1);
      setOrden(`Ordered ${event.target.value}`);
    }else {
      
      dispatch(filterCreatedGame(event.target.value));
      setCurrentPage(1);
      setOrden(`Ordered ${event.target.value}`);
    }
      
  }; 
  if(carga){
    return (
      <div className={s.cargaDiv}>
        <Loading/>
      </div>
    )
  }

  return (
    <div className={s.homediv}>
      <div className={s.searchBarDiv}>
        <SearchBar className={s.searchBar} setCurrentPage={setCurrentPage}/>
      </div>
      
      <div className={s.containerButtonStart}>
        <NavLink className={s.detailButtonStart} to={"/"}>
        </NavLink>
      </div>

      <div className={s.containerCrearJuego}>
        <NavLink className={s.detailButton} to={"/creategame"}>
        Create a game
        </NavLink>
      </div>

      <div className={s.containerDetails}>
        <NavLink className={s.detailButton} to={"/detail"}>
          About
        </NavLink>
      </div>
      
         
      <div className={s.filterBar}>
      <FilterBar className={s.detailButton} handleSortByName={handleSortByName} handleFilterGenres={handleFilterGenres}
      handleSortByRating={handleSortByRating}
      handleFilterCreated={handleFilterCreated}
      ></FilterBar>
      </div>

      <div className={s.paginado} >
        <Paginado  gamesPerPage={gamesPerPage} allGames={allGames.length} paginado={paginado} />
      </div>


      <div className={s.cards}>
        {
          allGames.length? currentGames.map((e) => {
            return (
              
              <div key={e.id} >
                <NavLink className={s.navLink} to={`/videogames/` + e.id}>
                <VideoGameCard 
                key={e.id}
                id={e.id}
                name={e.name}
                platforms={e.platforms
                  .map((e) => (typeof e === "object" ? e.name : e))
                  .join(", ")}
                released={e.released}
                createdInDb={e.createdInDb}
                image={e.image ? e.image : img404}
                genres={e.genres
                  ?.map((e) => (typeof e === "object" ? e.name : e))
                  .join(", ")}
                rating={e.rating}
              />
                </NavLink>
              </div>
            );
          }) : (
           <div>
            <img src={found} alt="error" style={{ width: '200px', height: '200px', borderRadius: '2em' }} />

           </div>
          )
        } 
      </div>
    </div>
  );
};

export default Home;