import React from 'react';

import {BrowserRouter} from "react-router-dom"
import { Header } from "./components/header/Header";
import { MainComponent } from "./components/main";
// import "rsuite/dist/rsuite.min.css";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <MainComponent/>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
