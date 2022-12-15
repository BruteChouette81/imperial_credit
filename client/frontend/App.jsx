import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

import Account from '../src/components/account/account';
import Home from '../src/components/home';
import Token from '../src/components/token'
import Upcoming from '../src/components/upcoming'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import NewNavBar from '../src/components/navbar';
import Tutorial from '../src/components/tutorial'
import Faq from '../src/components/blog'
import BugReport from '../src/components/bugreport';
import EndOfPage from '../src/components/endofpage'
import Liquidity from '../src/components/liquidity';
import Community from '../src/components/community';
import Whitepaper from '../src/components/whitepaper';

import Market from '../src/components/market/market'

//Amplify
import { Amplify, Auth, Storage} from 'aws-amplify'; //import { Amplify, Auth, Storage } from 'aws-amplify'; - see manual config using auth and storage
import awsmobile from '../src/aws-exports';

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

function getLibrary(provider) {
  return new Web3(provider)
}


function App() {
  //<Market />
  // <Whitepaper />
    return(
      <div>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Router>
            <NewNavBar />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/Account" element={<Account />} />
              <Route path="/Token" element={<Token/>}/>
              <Route path="/FAQ" element={<Faq />}/>
              <Route path="/Upcoming" element={<Upcoming />}/>
              <Route path="/Tutorial" element={<Tutorial />}/>
              <Route path="/Bug" element={<BugReport />}/>
              <Route path="/Market" element={<Upcoming />}/>
              <Route path="/Liquidity" element={<Liquidity />}/>
              <Route path="/Community" element={<Community />}/>
              <Route path="/Whitepaper" element={<Upcoming />}/>
            </Routes>
            <EndOfPage />
          </Router>
        </Web3ReactProvider>
        
      </div>
    ); //home

     
}

export default App;