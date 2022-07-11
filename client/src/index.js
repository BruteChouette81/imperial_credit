import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://a7p1zeaqvdrv.usemoralis.com:2053/server" appId="N4rINlnVecuzRFow0ONUpOWeSXDQwuErGQYikyte">
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
)