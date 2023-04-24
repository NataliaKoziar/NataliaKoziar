import React from 'react';

import { HashRouter} from "react-router-dom"
import { Header } from "./components/header/Header";
import { MainComponent } from "./components/main";
// import "rsuite/dist/rsuite.min.css";
import './App.css';

function App() {
  return (
    <HashRouter>
    <div className="App">
      <Header/>
      <MainComponent/>
    </div>
    </HashRouter>
    
  );
}

export default App;
