

import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
// import data from '../env.json';
import Avatar from "@material-ui/core/Avatar";
import Loader from "./Loader";
import { blue } from "@material-ui/core/colors";

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: "rgba(1, 247, 247, 0.72)",
    color: "white",
    // border:"0.1px solid #ad52ac",
    fontFamily: "Russo One",
    fontSize: "16px",
    
     background: "linear-gradient(112.76deg, rgba(255, 255, 255, 0.04) 70%, rgba(255, 255, 255, 0.01) 87.65%)",
    backdropFilter: "blur(20px)",
    boxShadow: "1px 1px 2px #ad52ac",
    
  },
  body: {
    fontFamily: "Russo One",
    fontSize: 14,
    color: "#fff",
    border:"none",
    // borderRadius:"12px",
    
    padding:"13px"
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(1)": {
       backgroundColor: "#1b0045 !important",
      //color: "#000 !important",
    
    },
    "&:nth-of-type(2)": {
      backgroundColor: "#1b0045 !important",
      // color: "#000 !important"
    },
    "&:nth-of-type(3)": {
      backgroundColor: "#1b0045 !important",
      // color: "#000 !important"
    },
    "&:nth-of-type(odd)": {
      //backgroundColor: "#1b0045 !important",
      background:"linear-gradient(112.76deg, rgba(255, 255, 255, 0.09) 7.77%, rgba(255, 255, 255, 0.1) 87.65%) !important",
      //color: "#000 !important"
    },
    "&:nth-of-type(even)": {
      //backgroundColor: "#1b0045 !important",

      background:"linear-gradient(112.76deg, rgba(255, 255, 255, 0.09) 7.77%, rgba(255, 255, 255, 0.1) 87.65%) !important",
      //color: "white !important",
    },


    
    // border:"2px solid white",
    backdropFilter: "blur(20px)",
    // backdropFilter:"blur(14px)",
    // borderRadius:"12px",
    // margin:"1px 1px 1px 1px"
    // border:"0.1px solid #ad52ac",
    //borderRadius:"10px",


    
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    margin:"30px auto",
    maxWidth: "900px",
    minWidth:"100px",
    width:"90%",
    // borderRadius:"12px",
    overflowX: "hidden",
   
  },
});

export default function Leadertable() {
  const [RankList, setRankList] = useState(false);
  const [loaded, setloaded] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    function getTimeline(){
      axios
      .get(process.env.api + "/api/leaderboard")
      .then((response) => {
        setRankList(response.data);
        

      })
      

    }
    // axios
    //   .get(process.env.api + "/api/leaderboard")
    //   .then((response) => {
    //     setRankList(response.data);
        

    //   })
    
      getTimeline()
      setloaded(true)
      const interval= setInterval(()=> getTimeline(), 10000)
      return () => {
        clearInterval(interval);
      }
  }, []);


  return (
    <div>
      { (loaded === true) ?
        <div className="rtable">
          <Table className={classes.table} aria-label="customized table">
            <TableHead >
              <TableRow >
                <StyledTableCell >Rank</StyledTableCell>
                <StyledTableCell >Avatar</StyledTableCell>
                
                <StyledTableCell align="left" >Player</StyledTableCell>
                <StyledTableCell align="left" >Points</StyledTableCell>
              </TableRow>
            </TableHead>
            {RankList.length ? (
              <TableBody style={{ fontFamily: "'Barlow', sans-serif", padding:"5px 1px 1px 1px" }}>
                {RankList.map((row, index) => (
                  <StyledTableRow
                    key={index}
                    style={{ fontFamily: "'Barlow', sans-serif",borderRadius:"12px"}}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.rank}.
                  </StyledTableCell>
                    <StyledTableCell align="left">
                      <Avatar
                        alt={name}
                        src={row.imgurl}
                      /></StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell align="left">{row.score}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            ) : (
                <Typography
                  variant="h6"
                  className={classes.title}
                  style={{ fontFamily: "'Russo One', sans-serif", fontSize: 18, color: 'white' }}
                >
                  &nbsp;&nbsp;&nbsp;Loading...
                </Typography>
              )}
          </Table>
        </div>
        : <Loader />}
    </div>
  );
}
