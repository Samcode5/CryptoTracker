import React from 'react';
import {makeStyles} from "@material-ui/core";
import {AppBar,Container, Typography,Toolbar,Select,MenuItem,createTheme,ThemeProvider} from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import {CryptoState} from "../CryptoContext";


const useStyles = makeStyles(() =>({
  title:{
    color:"gold",
    flex:1,
    fontFamily:"Montserrat",
    fontWeight:"bold",
    cursor:"pointer"

  }
}))




function Header()
{

  const classes =useStyles();
  let navigate =useNavigate();

  const {currency, setCurrency} = CryptoState();

  const darktheme =createTheme({
    palette:{
      primary:{
        main:"#fff"
      },
      type:"dark"
    }
  })


  return ( 
    <ThemeProvider theme={darktheme}>
    <AppBar 
    color='transparent' 
    position='static'>
    <Container>
    <Toolbar>
      <Typography onClick={()=>navigate("/")}
       className={classes.title} variant="h6">
       Crypto Tracker
      </Typography>
      <Select variant="outlined" 
      style={
        {
          height:40,
          width:100,
          margin:10
        }
      }
     value={currency}
     onChange={(e) =>setCurrency(e.target.value)}
      >
      
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"INR"}>INR</MenuItem>
      </Select>
      </Toolbar>
    </Container>

    </AppBar>
    </ThemeProvider>
  )
}

export default Header