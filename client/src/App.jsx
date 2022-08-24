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
import BugReport from './components/bugreport';
import EndOfPage from './components/endofpage'

//Amplify
import { Amplify, Auth, Storage} from 'aws-amplify'; //import { Amplify, Auth, Storage } from 'aws-amplify'; - see manual config using auth and storage
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);
//
Amplify.configure({
  Auth: {
    identityPoolId: 'ca-central-1:85ca7a33-46b1-4827-ae75-694463376952',
    region: 'ca-central-1',
    userPoolId: 'ca-central-1_PpgocuiOa',
    userPoolWebClientId: '3e5qk8i1f53cp415ou2h26lpn9'
    
  },
  Storage: {
    AWSS3: {
      bucket: "clientbc6cabec04d84d318144798d9000b9b3205313-dev",
      region: "ca-central-1",
    }
    
  }
})



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
            <Route path="/Bug" element={<BugReport />}/>
          </Routes>
          <EndOfPage />
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
            <Route path="/Bug" element={<BugReport />}/>
          </Routes>
          <EndOfPage />
        </Router>
      </div>
    ); //home
  }

     
}

export default App;
