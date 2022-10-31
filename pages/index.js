import React, { useEffect, useState } from "react";
import Login from "../components/Login"
import styles from "../styles/index.module.css"
import LeadboardLogin from "../components/LeadboardLogin"
import Rules from "../components/Rules"
import Link from 'next/link'
import Footers from "../components/Footers"
import { GoogleOAuthProvider } from "@react-oauth/google";

function index() {
  
  
  

  return (
   <div className={styles.dashboard}> 
  <div className={styles.glasscontainer}>
    <div className={styles.nave}>
      <div className={styles.logo}>GEEKTOBER</div>
    </div>

    <div className={styles.main}>
    <div className={styles.innercontent}>
      <h4>Ready to play? </h4>
      <p>We are all set to steer your quest for solving baffling enigmas concealed in questions. Dive deep into questions with your technical intellect and open source skills.</p>
       
      <div className={styles.buttons}>
      <Rules />
      <LeadboardLogin>
      {/* <GoogleOAuthProvider clientId="23832229348-1vhkpuh87bbab8ikpscvbs78migp0os6.apps.googleusercontent.com"> */}
        {/* <Link href='/leaderboard'> */}
        <a className={styles.btn}>Leaderboard</a>
        {/* </Link> */}
      {/* </GoogleOAuthProvider> */}
      </LeadboardLogin>
    </div>
      
    </div>
         <Login/>
    </div>
     <Footers />   
  </div>
  
</div>
 

   
            
            
             
    
  );
}

export default index;