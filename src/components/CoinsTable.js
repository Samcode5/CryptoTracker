import React, { useState ,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {CoinList} from "../config/api";
import {CryptoState} from "../CryptoContext";
import {Pagination} from "@material-ui/lab";
import { makeStyles,Container,TextField,Typography ,createTheme,ThemeProvider, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";

function CoinsTable()
{
    const [loading,setloading] = useState(false);
    const [coins,setcoins] = useState([]);
    const [search,setSearch]=useState("");
    const [page,setpage] =useState(1);
    const {currency} = CryptoState();


    const {symbol} =CryptoState();

 //fetch data from api
 const fetchCoinData = async() =>{
    setloading(true);
    const {data} = await axios.get(CoinList(currency));
    setloading(false);
    setcoins(data);
 }

 useEffect(() =>{
    fetchCoinData();
 },[currency])


const darktheme = createTheme({
    palette:
    {
        primary: {
            main: '#FFFFFF'
        },

        type:"dark"
       }
    }
)


const useStyles=makeStyles(() => ({
    row:{
        backgroundColor:"#16171a",
        cursor: "pointer",
        "&:hover":{
            backgroundColor:"#666362"
        },
        font:"Montserrat",
      
     },
     pagination:{
        "& .MuiPaginationItem-root":{
            color:"gold"
        }
     }
}))



const handleSearch= ()=>{
    return coins.filter(coin =>{
        return (coin.name.toLowerCase().includes(search)  || (coin.symbol.toLowerCase().includes(search)))
    })
}

const heading =["Coin","Price","24h Change","Market Cap"];
let navigate = useNavigate();


const classes = useStyles();


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


return(

    <ThemeProvider theme={darktheme}>
        <Container style={{textAlign:"center"}}>
        <Typography variant="h4"  style={{margin:18,font:"Montserrat"}}>
            CryptoCurrency Prices by Market cap
        </Typography>
        
        <TextField label="Search for a  CryptoCurrency" 
         variant ="outlined" style={{width: "100%",marginBottom:20}} 
         onChange={(e => {setSearch(e.target.value)} )}>
         </TextField>
        <TableContainer>
            {loading ? (<LinearProgress style={{backgroundColor:"gold"}}></LinearProgress>):(
             <Table>
                <TableHead style={{backgroundColor:"#ffbf00"}}>
                    <TableRow style={{color:"black" ,font:"bold"}}>
                       {heading.map((head) => (
                        <TableCell
                        style={{
                            fontsize:"19",
                            color:"black",
                            fontWeight:"800"
                        }}
                            key={head}
                            align={head==="Coin"?"":"right"}>
                            {head}
                        </TableCell> ))}
                    </TableRow>
                </TableHead>
                 <TableBody>
                    {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row) =>{
                        const  profit =row.price_change_percentage_24h >0 ;
                        return (
                            <TableRow
                             onClick={() =>navigate(`/coins/${row.id}`)}
                             className={classes.row}
                             key={row.name}
                            >

                                <TableCell
                                //coin image and symbol
                                    component=""
                                    scope="row"
                                    style={{
                                    display: 'flex',
                                    gap:15
                                }}>
                                <img
                                 src={row.image}
                                 alt={row.name}  
                                 height="40"
                                 style={{marginBottom:'10px'}}
                                /> 
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span style={{
                                   textTransform: 'uppercase',fontWeight: 'bold',fontSize:18}}>
                                    {row.symbol}
                                    </span>
                                    <span style={{color:"darkGray",fontSize:16}}>
                                        {row.name}
                                    </span>
                                </div>

                                </TableCell>
                                
                                <TableCell 
                                // current price
                                align="right"
                                style={{fontSize:16}}
                                >
                                {symbol}
                                {numberWithCommas(row.current_price.toFixed(2))}
                                </TableCell>
                                <TableCell 
                                // 24 change
                                align='right' style={{fontSize:16,color:profit > 0 ? "rgb(14, 203, 129)":"red"}}>
                                 {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}{"%"}
                                </TableCell>
                                <TableCell align="right" style={{fontSize:16}}>
                                   {symbol}{numberWithCommas(row.market_cap).toString().slice(0,-6)}M
                                </TableCell>
                            </TableRow>

                        )
                    })}
                 </TableBody>
             </Table>

            )}
        </TableContainer>
        <Pagination
         style={{
            padding:20,
            marginBottom:10,
            width:"100%",
            display:"flex",
            justifyContent: "space-around",
            
         }}
         classes={{ ul:classes.pagination }}
         count={(handleSearch()?.length/10).toFixed(0)}
         onChange={(_,value) => {
            setpage(value);
            window.scroll(0,450)
         }}
        />
        </Container>
        </ThemeProvider>
    )
}

export default CoinsTable;