// import { StrictMode } from 'react';   
// import { createRoot } from 'react-dom/client';  
// import App from './App.jsx';  
// import { BrowserRouter } from "react-router-dom";   
// import { legacy_createStore } from "redux";   
// import { Provider } from "react-redux";    
// import Reducer from "./Redax/Reducer.jsx";  

// const appStore = legacy_createStore(Reducer);   

// createRoot(document.getElementById('root')).render(

//     <BrowserRouter>   
//       <Provider store={appStore}> 
//         <App />   
//       </Provider>
//     </BrowserRouter>

// );

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { legacy_createStore } from "redux"
import { Provider } from "react-redux"
import Reducer from "./Redax/Reducer.jsx"

const appStore = legacy_createStore(Reducer)
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Provider store={appStore}>
      <App />
    </Provider>
  </BrowserRouter>

)
