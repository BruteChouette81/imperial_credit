import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Navigbar from "./components/Navbar"
import Profile from './components/account/Profile'
import Install from './components/Install';
import Home from './components/Home';
import About from './components/About'
import Token from './components/Token'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  if (window.ethereum) {
    console.log("i exist")
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
  } else {
    return <Install />
  }
}

export default App;