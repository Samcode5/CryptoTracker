import { makeStyles } from '@material-ui/core';
import React from 'react';

const SelectedButton = ({children,onClick,select}) => {

    const useStyles=makeStyles(({
        buttons:{
            marginLeft:20,
            padding:20,
            borderRadius:5,
            paddingLeft:10,
            fontFamily:"Montserrat",
            fontWeight:"bold",
            cursor:"pointer",
            border:"1px solid gold",

            "&:hover":{
                backgroundColor:"gold",
                color:"black",
            },

            backgroundColor:select?"gold":"",
            color:select?"black":"white"
            
        }
    }));


  const classes= useStyles();

  return (
   <span className={classes.buttons} onClick={onClick} >{children}</span>
  )
}

export default SelectedButton;