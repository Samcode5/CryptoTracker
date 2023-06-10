import axios from 'axios';
import React, { useState,useEffect } from 'react';
import {CryptoState} from "../CryptoContext";
import {HistoricalChart} from "../config/api";
import {createTheme,ThemeProvider,makeStyles,CircularProgress} from "@material-ui/core";
import {Line} from "react-chartjs-2";
import {Chart as ChartJS,Title,Tooltip,Legend,LineElement} from 'chart.js/auto';
import {chartDays} from "../config/data.js";
import SelectedButton from "./SelectedButton";


function CoinInfo({coin})
{

 const [historicdata,sethistoricdata] =useState();
 const [days,setdays]=useState(1);

 const {currency} =CryptoState();
 

 const fetchdata = async() => {

   const {data} = await axios.get(HistoricalChart(coin.id,days,currency))
        sethistoricdata(data.prices);
     

 };

  


 
useEffect(() => {
fetchdata();
},[days,currency]);

   


const darkTheme=createTheme({
    palette :{
        primary:{
            main:"#fff"

        },
        type:"dark",
    }, 
})

const UseStyles=makeStyles((theme)=>({
    container:{
     width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
        } ,

        buttons: {
            marginRight: 100,

        }


        
    }

}))

 const classes=UseStyles();
    return(
        <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
         {!historicdata ?(
                <CircularProgress
                    style={{color:"gold"}}
                    size={100}
                    thickness={1}
                />
            ):(
                   <>
                    <Line
                        data={{
                labels: historicdata.map((coin) => {
                  let date = new Date(coin[0]);
                  let time = date.getHours() > 12 ? 
                  `${date.getHours() - 12}:${date.getMinutes()} PM` : 
                  `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                            }),
                            datasets:[
                                {
                                    data:historicdata.map((coin) => coin[1]),
                                    label:`Price (Past ${days} Days) in ${currency}`,
                                    borderColor:"#EEBC1D",
                                    pointRadius:1,
                                    lineTension: 0.2
                                }
                            ]
                        }}
                       
                    />
              <div style={{
                display:"flex",
                width:"100%",
                marginTop:20,
                justifyContent:"space-around"
              }}>
                {
                   chartDays.map((day)=>{
                    return(
                    <SelectedButton 
                    key={day.value}
                    onClick={()=> setdays(day.value)}
                    select={day.value==days}
                    >
                    {day.label}
                    </SelectedButton>
                    )
                   })
                }
              </div>
                    </>
            )
         }
     
         </div>
      </ThemeProvider>)
    
}

export default CoinInfo;