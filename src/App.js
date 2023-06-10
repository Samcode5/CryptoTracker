import React from "react";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import Coinpage from "./Pages/Coinpage";
import {makeStyles} from "@material-ui/core";
import "./App.css";




function App()
{


  const useStyles = makeStyles(() =>({
    App:{
      backgroundColor:'#212121',
      color:'white',
      minHeight: '100vh',

    }
  })
  );

  const classes = useStyles();

  return(
    
    <BrowserRouter>
     <div className={classes.App}>
     <Header/>
     <Routes>
    <Route  path="/"  element={<HomePage/>} />
    <Route path="/coins/:id" element={<Coinpage/>} />

    </Routes>
     </div>
    </BrowserRouter>
  )
}


export default App;