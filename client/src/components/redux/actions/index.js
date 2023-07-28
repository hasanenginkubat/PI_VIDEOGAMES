import axios from "axios"



export function getVideogames() {
  return async (dispatch) => {
  try {
    const call = await axios.get("http://localhost:3001/videogames");
    console.log(call.data)
    return dispatch({
      type: "VIDEO_GAMES",
      payload: call.data,
    });
  } catch(error) {
    console.log(error)  
  }
 }
}

    export function getDetail(id) {
      return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
         return dispatch({
          type: "GET_DETAILS",
          payload: response.data,
         })
      } catch(error) {
        console.log(error)
      }
   }
 }

   export function deleteGame(id) {  
    return async (dispatch) =>{
    try {
    return await axios.delete(`http://localhost:3001/videogames/${id}`).then((g) => dispatch ({
    type: "DELETE_GAME",
    payload: g.data
  }))
    } catch (error) {
     console.log(error)
    }
 }
}

export function getPlatform() {
  return async (dispatch) => {
 try {
    const response = await axios.get(`http://localhost:3001/videogames`);
    const allPlat = await response.data.map((e) => e.platforms);
    const plats = await allPlat.flat();
    const unicos = [...new Set(plats)];
    
    return dispatch({
      type: "GET_PLATFORMS",
      payload: unicos,
    })
 } catch (error) {
  console.log(error)
 }
}
}

export function postGame(game) {
  
  return async () => {

  try {
     const response = await axios.post("http://localhost:3001/videogames", game);
    return response;
    
  } catch (error) {
    console.log(error)
  }
};
}

export function getVideogamesName(name){ 
  
  return async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    return dispatch({ 
      type: "VIDEO_GAMES_NAME",
       payload: response.data 
      });
  } catch (error) {
  console.log(error)
  }
}
}

export function getByGenres() {
  return async  (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3001/genres`);
    console.log(response.data)
  
    return dispatch({
      type: "GET_BY_GENRE",
      payload: response.data,
    })
  } catch (error) {
    console.log(error)
  }
}
}

export function filterByGenres (payload){
  return {
    type: "FILTER_BY_GENRES",
    payload,
  }
}

export function filterCreatedGame(payload) {
    return{
      type: "FILTER_CREATED_GAME",
      payload,
    }
};

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload,
    }
};

export function sortByRating(payload)  {
  return {
    type: "SORT_BY_RATING",
    payload,
  };
}

export const login = (email, password) => {
  return {
    type: "USER_DATAPE",
    email,
    password,
  };
}
