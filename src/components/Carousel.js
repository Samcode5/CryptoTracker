import React  from "react";
import {Link, makeStyles} from "@material-ui/core";
import {CryptoState} from "../CryptoContext";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { useState,useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import {useNavigate} from "react-router-dom";





function Carousel() {

 // to add commas to number
 function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  const [trending,setTrending]= useState([])
    const {currency,symbol} = CryptoState();
   
    // fetching the data from api 
     const fetchTrendingCoin =async() =>{
     const {data} = await axios.get(TrendingCoins(currency));
     setTrending(data);
     }

    
  // to render the fetchtrendingcoins everytime the currency changes 
    useEffect(() =>{
      fetchTrendingCoin();
    },[currency])

    let navigate = useNavigate();
  const useStyles = makeStyles((theme) =>({
    carousel:{
      height:"50%",
      display:"flex",
      alignItems: "center",
    
  },
  
  carouselItems:{
    display:"flex",
    flexDirection:"column",
    alignItems: "center",
    fontFamily:"Helvetica",
    color:"white",
    textTransform:"uppercase",
    
  
  }
  
  }))
  
 
        
    const classes = useStyles();


//showcasing the trending coins on page
const items = trending.map((coin => {
  let profit = coin.price_change_percentage_24h_in_currency >=0 ;
   return(
    <Link className={classes.carouselItems} to={`/coins/${coin.id}`} onClick={()=>navigate(`/coins/${coin.id}`)}>
    <img 
    src={coin.image}
    alt={coin?.alt}
    height="90"
    style={{marginBottom:10,cursor:'pointer'}}
    
    />
   
    <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500, 
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span><br/>
        <span style={{ fontSize: 22, fontWeight: 500}}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      
 </Link>
   )
}))


 // if more than 512 pixels then it will display 4 items   
const responsive = {
  0: {
      items: 1,
  },
  512: {
      items: 4
  }
}

    return(
        <div className={classes.carousel}>
        <AliceCarousel
        
          mouseTracking
          infinite 
          autoPlayInterval={1000}
          animationDuration={1500}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          autoPlay
          items={items}
          />

       

        </div>
    )
}


export default Carousel;