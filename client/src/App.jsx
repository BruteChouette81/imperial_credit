import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

//import Navigbar from "./components/navbar"
import Profile from './components/account/profile'
import Home from './components/home';
import About from './components/about'
import Token from './components/token'
import Upcoming from './components/upcoming'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import NewNavBar from './components/navbar';
import Tutorial from './components/tutorial'
import Faq from './components/blog'

function App() {
    return(
      <div>
        <Router>
          <NewNavBar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Profile" element={<Profile />} />
            <Route path='/About' element={<About/>}/>
            <Route path="/Token" element={<Token/>}/>
            <Route path="/FAQ" element={<Faq />}/>
            <Route path="/Upcoming" element={<Upcoming />}/>
            <Route path="/Tutorial" element={<Tutorial />}/>
          </Routes>
        </Router>
      </div>

     ); //home
}

export default App;
