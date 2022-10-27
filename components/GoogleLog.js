import React, { useState, useEffect } from "react";
import {useGoogleLogin} from '@react-oauth/google';
import axios from "axios";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
// import { SocialMediaIconsReact } from 'social-media-icons-react';
import Router from "next/router";
import Link from "next/link";

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
  },
});

function GoogleLog(props) {

  const [userDetails, setUserDetails] = useState({}),
    [isUserLoggedIn, setIsUserLoggedIn] = useState(false),
    [access, setAccess] = useState(""),
    [result, setResult] = useState(false)

  useEffect(() => {
      if (localStorage.getItem("token")) {
        setIsUserLoggedIn(true);
      }

  }, []);
  const login = useGoogleLogin({
    flow:'auth-code',
    onSuccess: response => fetchIdToken(response)
  })
  const fetchIdToken = (response) =>{
    const code = response.code
    try{
       axios.post(`https://oauth2.googleapis.com/token?code=${code}&redirect_uri=${process.env.REDIRECT_URI}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=authorization_code`)
       .then((res) => {
          responseGoogle(res.data)
       })
    }catch(err){
      console.log(err);
    }
  }
  const responseGoogle = (response) => {
    console.log(response);
    axios
      .post(process.env.api + "/api/googlelogin", {
        token: response.id_token
      })
      .then((res) => {
        localStorage.setItem('token', res.data.access_token)
        //localStorage.setItem('ref_token', res.data.refresh_token)
        localStorage.setItem("email", res.data.username);
        localStorage.setItem("name", res.data.username);
        localStorage.setItem("image", res.data.image);

        setResult(res.data.quiz_finished)
        setAccess(res.data.access_token)
        setUserDetails(response.profileObj)
        setIsUserLoggedIn(true)




        if (res.status !== 200) {
          Router.push('/error')
        }
        else {
          Router.push('/dashboard')
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }



  const { classes } = props;
  return (
    <div>
      <div>
        { !isUserLoggedIn ? (
          <div className={classes.root}  >

          <Button 
            variant="contained"
            color="secondary"
            disableElevation={true}
            onClick={login}
            
            className="btnSubmit"
            style={{ 
                backgroundColor: "rgba(0,0,0,0)", 
                padding: "0",
                 color: "white", 
                //  border: "2px solid #b14de0", 
                //  backgroundColor: "#330965",
                marginTop: "50px",
                 height: "0px", width: "0px", 
                 fontWeight:"bolder",
                 borderRadius: "20px",
                 letterSpacing: "2px",  
                 textAlign:"center",
                 boxShadow:"0 0px 10px 0 #b14de0 inset,0 2px 10px 0 #b14de0,0 1px 10px 0 #b14de0 inset,0 5px 20px 0 #b14de0",
                 alignItems:"center",alignContent:"center",
                 fontSize:"15px",
                
                 }}
          >
            {/* <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="4" borderStyle="inset" icon="googleplus" iconColor="rgba(0,0,0,1)" backgroundColor="rgb(135, 194, 250)" iconSize="7" roundness="50%" size="53" /> */}
            {/* <GoogleLogin

            onSuccess={responseGoogle} //isSignedIn ??
            onFailure={responseGoogle} //handle later

            cookiePolicy={"single_host_origin"}
          /> */}
           <img style={{height:"40px", padding:"1px 1px 1px 1px", margin:"px 1px 1px 1px"}}src="./google.png"></img>
          </Button>
          {/* <img style={{height:"50px", padding:"1px 1px 1px 1px", margin:"px 1px 1px 1px"}}src="./google.png"></img> */}
        </div>
          
        ):
        (<div> 
          <Link href="/dashboard">
          <Button style= {{color: "white", 
                       border: "2px solid #b14de0", 
                       backgroundColor: "#330965",
                       height: "40px", width: "120px", 
                       fontWeight:"bolder",
                       borderRadius: "20px",
                       letterSpacing: "2px",  
                       textAlign:"center",
                       boxShadow:"0 0px 10px 0 #b14de0 inset,0 2px 10px 0 #b14de0,0 1px 10px 0 #b14de0 inset,0 5px 20px 0 #b14de0",
                       alignItems:"center",alignContent:"center",
                       fontSize:"15px",}}>PLAY</Button>
          </Link>
          </div>)
      }
      </div>
    </div>

  );
}
export default withStyles(useStyles)(GoogleLog);