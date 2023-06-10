import { Container, makeStyles, Typography} from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";






const useStyles = makeStyles(() =>({
    banner: {
        backgroundImage: "url(./images/bk.jpeg)",
        height:400,
},
     bannerContent:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        paddingTop:25,
        textAlign: 'center'

    },



   

}));


function Banner()
{
    const classes = useStyles();

    return (
        <div className={classes.banner}>
      <Container className={classes.bannerContent}>
      <Typography   style={{
          fontSize:'3.50rem',  
          fontWeight:900,
          paddingTop:25,    
          paddingBottom:25
      }}>Crypto Tracker</Typography>

      <Typography  variant="subtitle2" style={{
            paddingBottom:25,
            textTransform:"capitalize",
            color:"darkgrey",
        }}
      
      >Track all information regarding your favorite Crypto currency</Typography>
    </Container>
    <Carousel/>
         </div>
    )
}

export default Banner;