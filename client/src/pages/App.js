import {Jumbotron} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Sky from "react-sky"
import axios from '../common/axios'
import cakeSlice from  "../img/cake-slice.svg"
import cupcake from "../img/cup-cake.svg"
import cookie from "../img/cookie.svg"
import beans from "../img/coffee-beans.svg"
import cup from "../img/coffee-cup.svg"
import latte from "../img/latte.svg"
import macaron from "../img/macaron.svg"


// Choose the role: user or customer
function App() {
  const [lat,setLat] = useState('')
  const [lng,setLng] =  useState('')
  const [isVlogin, setVlogin] = useState('');
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
    });
  }, [])

  useEffect(()=>{
    axios.post("/vendor/loginState",{token:localStorage.getItem("vjwtToken")}).then(response=>{
      if(response.data.status==="10000"){
        setVlogin(true)
      }
    })
  })

  localStorage.setItem("lat",lat)
  localStorage.setItem("lng",lng)

  const checkVlogin = () =>{
    if(isVlogin){
      return  <Link to="/Vendor/Location">
                <Button variant="contained" color="primary" size="large" style = {{marginLeft:"2vw",width:94.27  }}>Vendor</Button>
              </Link>

    }else{
      return <Link to="/Vendor/Login">
                <Button variant="contained" color="primary" size="large" style = {{marginLeft:"2vw",width:94.27  }}>Vendor</Button>
              </Link>

    }
  }

  return (
    // The Home Page
    <div>
      <Sky images={{
            /* FORMAT AS FOLLOWS */
            0: cupcake,
            1: cakeSlice,
            2: cookie,
            3: latte,
            4: beans,
            5: macaron,
            6: cup,
          }}
          how={110} /* You have to pass a number so Sky will render that amount of images chosen randomly from the object you passed in the previous step */
          time={20} /* time of the animation. Dfaults at 20s */
          size={'100px'} /* size of the rendered images. Defaults at 150px */
          background={"#E0E0E0"} /* color of background. Defaults to none *//>
          <div className="App" style={{margin:"auto"}}>
            <Jumbotron style={{background: "white", marginLeft: "35%",marginTop:"20vh",backgroundColor:"transparent"}}>
              <span style={{fontSize:"50px",fontWeight:"bold"}}>Welcome to Snacks In Van</span>
              <p style = {{fontSize:"20px"}}>
                Snacks in Van runs a fleet of food trucks that work as popup cafes.
                <br></br> 
                Choose your identity to continue😎
              </p>
              {/* Customer role button  */}
              <Link to="/Customer/Location" >
                <Button variant="contained" color="primary" size="large">Customer</Button>
              </Link>
              {/* Vendor role button  */}
              {checkVlogin()}
            </Jumbotron>
          </div>
    </div>

  );
}

export default App;
