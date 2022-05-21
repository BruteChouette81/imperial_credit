import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Navigbar from "./components/Navbar"
import Profile from './components/account/Profile'
import Home from './components/Home';
import About from './components/About'
import Token from './components/Token'
import "./app.css"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return(
      <div>
        <Router>
          <Navigbar/>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Profile" element={<Profile />} />
            <Route path='/About' element={<About/>}/>
            <Route path="/Token" element={<Token/>}/>
          </Routes>
        </Router>
      </div>

     ); //home
}

export default App;