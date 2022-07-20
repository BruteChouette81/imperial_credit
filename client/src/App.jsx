import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Profile from './components/account/profile'
import Home from './components/home';
import Token from './components/token'
import Upcoming from './components/upcoming'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import NewNavBar from './components/navbar';
import Tutorial from './components/tutorial'
import Faq from './components/blog'
import Install from './components/install';

function App() {
  if (window.ethereum){
    return(
      <div>
        <Router>
          <NewNavBar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Token" element={<Token/>}/>
            <Route path="/FAQ" element={<Faq />}/>
            <Route path="/Upcoming" element={<Upcoming />}/>
            <Route path="/Tutorial" element={<Tutorial />}/>
          </Routes>
        </Router>
      </div>
    ); //home
  }
  else {
    return(
      <div>
        <Router>
          <NewNavBar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Profile" element={<Install />} />
            <Route path="/Token" element={<Token/>}/>
            <Route path="/FAQ" element={<Faq />}/>
            <Route path="/Upcoming" element={<Upcoming />}/>
            <Route path="/Tutorial" element={<Tutorial />}/>
          </Routes>
        </Router>
      </div>
    ); //home
  }

     
}

export default App;
