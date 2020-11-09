import React, {useEffect} from "react";
import './App.css';
import MyRouter from './components/MyRouter';
import {appLoaded} from './service/AnalyticsManager'

function App() {
  useEffect(()=>{
    appLoaded()
  },[])
  return (
    <div className="App">
      <MyRouter/>
    </div>
  );
}

export default App;
