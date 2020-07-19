import React, { useEffect, useState } from "react";

import Head from "next/head";
import Logo from "../glug.png";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GoogleLog from "../components/GoogleLog";
import FbLog2 from "../components/FbLog2";
import Timer2 from "../components/Timer2"


function index() {
  
  const [end, setEnd] = useState(Date.now());
  const [start, setStart] = useState(Date.now());
  const [day, setDay] = useState(0);

  useEffect(() => {
    console.log(Date.now());
    axios
      .get("https://screencast2020.herokuapp.com/api/status")
      .then((response) => {
        
        console.log( (new Date(response.data.start_time)).getTime());
        setStart((new Date(response.data.start_time)).getTime())
        setEnd((new Date(response.data.end_time)).getTime())
        setDay(response.data.current_day)
        //localStorage.setItem("day", day);
      });
  })

  return (
    <div>
      <style jsx>{`
        div {
          text-align: center;
          content-align: center;
          margin: 0px auto;
        }
      `}</style>


      <div>

        <div>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, shrink-to-fit:no"
            />
            <title>Screencast </title>
            <link rel="stylesheet" type="text/css" href="question.css" />
          </Head>
        </div>

        <Navbar />

        <Timer2 start={start} />

        <div>
            <div
              className="sign"
              style={{
                marginTop: "40px",
                marginBottom: "20px",
                fontFamily: "'Russo One', sans-serif",
              }}
            >
              <span className="fast-flicker">screen</span>cast{" "}
              <span className="flicker">2020 </span>
          </div>
          <div className="login-head" style={{ marginBottom: "60px" }}>
            <h1>Login to play </h1>
          </div>
        </div>
        
        <div className='rowC'>
        <GoogleLog />
        <FbLog2 />
        </div>
        
      </div>
      <div
        style={{
          marginRight: "auto",
          marginLeft: "auto",
          width: "100%",
          bottom: "25px",
          position: "fixed",
          textAlign: "center",
        }}
      >
        <img
          src={Logo}
          alt="logo"
          style={{
            marginTop: "90px",
            width: "50px"

          }}
        />
      </div>
      <Footer style={{ color: "white" }} />

    </div>

  );
}

export default index;
