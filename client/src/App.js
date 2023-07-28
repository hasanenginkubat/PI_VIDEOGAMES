import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LandingPage from "./components/landingpage/LandingPage"
import Home from "./components/home/Home";
import GameCreate from './components/gamecreate/GameCreate';
import GameDetail from './components/gamedetail/GameDetail';
import { NotFound } from './components/notFound/NotFound';
import { About } from './components/about/About';
import { Route, useLocation, useNavigate, Routes } from "react-router-dom"; // useHistory eklendi
import config from './components/config';



function App() {
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const { e, p } = config;
  const navigate = useNavigate();
  const location = useLocation();
  const [access, setAccess] = useState(false);

  useEffect(() => {
    if (password === p && email === e) {
      setAccess(true);
    } else {
      setAccess(false);
    }
    console.log(password, p, email, e);
  }, [password, email, p, e]);

  useEffect(() => {
    if (!access && location.pathname !== "/") {
      navigate("/"); // navigate yerine push kullanıldı
    } else if (access && location.pathname === "/") {
      navigate("/home"); // navigate yerine push kullanıldı
    }
  }, [access, navigate, location]);

  return (
   
      <div className="App">
          <Routes>
      <Route path="/" element={<LandingPage />} />
        
        {access ? (
          <>
       
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/creategame" element={<GameCreate />} />
            <Route exact path="/videogames/:id" element={<GameDetail />} />
            <Route exact path="/detail" element={<About />} />
            <Route path="/*" element={<NotFound />} />
          </>
        ) : (
          <Route path="/*" element={<LandingPage />} />
        )}
        </Routes>
      </div>
  
  );
}

export default App;
