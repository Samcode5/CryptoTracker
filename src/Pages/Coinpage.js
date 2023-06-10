import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../config/api";
import {CryptoState} from "../CryptoContext";
import {LinearProgress, makeStyles, Typography} from "@material-ui/core";
import CoinInfo from "../components/CoinInfo";
//import ReactHtmlParser from "react-html-parser";

function Coinpage()
{
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    const useStyles=makeStyles((theme) =>({
        container:{
            display:"flex",
            [theme.breakpoints.down("md")]:{
                flexDirection:"column",
                alignItems:"center",
               
            },
         
        },

        sidebar:{
            width:"30%",
            
            [theme.breakpoints.down("md")]:{
                width:"100%"
            },

            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            marginTop:25,
            borderRight: "2px solid grey"
        },

        heading: {
            fontWeight:"bold",
            marginBottom:20,
            justifyContent: "center",
            fontFamily:"Montserrat",
            marginLeft:15
        },

        description:{
            width:"100%",
            padding:20,
            textAlign:"justify",
        },

        marketdata:{
            alignSelf:"start",
            paddingLeft:10,
            marginTop:20,
            width:"100%",
            [theme.breakpoints.down("md")]:{
                display:"flex",
                justifyContent:"space-around",
            },

            [theme.breakpoints.down("sm")]:{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                
            },

            [theme.breakpoints.down("xs")]:{
            
                alignItems:"start",
                
            },


        }
        
        
    }))


    const {id} =useParams();
    const [Coin,setCoin] = useState();
    const {currency,symbol} = CryptoState();

    const fetchCoin = async() =>{
      const{data} = await axios.get(SingleCoin(id))
      setCoin(data);
    } 

    
   

    useEffect(() =>{
        fetchCoin();
    },[currency]);
 
    const classes = useStyles();

if (!Coin) return <LinearProgress style={{backgroundColor:"gold"}}></LinearProgress>

    return(
    <div className={classes.container}>
            {/* sidebar */}
        <div className={classes.sidebar}>
        <img src={Coin?.image.large}
        alt={Coin?.name}
        height="200"
        />  
         <Typography variant="h3" className={classes.heading}>
           {Coin?.name}
         </Typography>

         <Typography variant="subtitle2" className={classes.description}>
        {/* {(Coin?.description.en.split(".")[0])} */}
         </Typography>
         <div className={classes.marketdata}>
        <span style={{display:"flex",fontFamily:"Montserrat",marginBottom:10}}>
        <Typography variant="h5" style={{fontWeight:"bold"}} >Rank: </Typography>&nbsp;
        <Typography variant="h5" style={{fontFamily:"Montserrat"}}> {Coin?.market_cap_rank}</Typography>
       </span>
       <span style={{display:"flex",fontFamily:"Montserrat",marginBottom:10}}>
        <Typography variant="h5" style={{fontWeight:"bold"}} >Current Price: </Typography>&nbsp;&nbsp;
        <Typography variant="h5" style={{fontFamily:"Montserrat"}}>{symbol}{" "}{numberWithCommas(Coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
       </span>
       <span style={{display:"flex",fontFamily:"Montserrat",marginBottom:10}}>
        <Typography variant="h5" style={{fontWeight:"bold"}} >Market Cap: </Typography>&nbsp;&nbsp;
        <Typography variant="h5" style={{fontFamily:"Montserrat"}}>{symbol}{" "}{numberWithCommas(Coin?.market_data.market_cap[currency.toLowerCase()]).toString().slice(0,6)}</Typography>
       </span>
       
        </div>
        </div>
         {/* market_chart */}   
         
        <CoinInfo coin={Coin}></CoinInfo>
       
        </div>
        
    )
}

export default Coinpage;