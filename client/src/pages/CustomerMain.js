import React from 'react'
import { Link } from "react-router-dom";
import { Input,Divider} from 'antd';
import {Jumbotron, Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import {SearchOutlined} from "@ant-design/icons";
import background from '../img/MainBackground.png'
import LoginPart from "../components/LoginPart"

// Let the user enter the current place to locate where they are
export default function CustomerMain(props) {
    return (
        <div className="CustomerHome" style={{ backgroundImage: `url(${background})`,backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh' }}>
            {/* Home button and Login button  */}
            <div>
                <Link to="/">
                    <Button variant="Link" style={{float:"Left",marginLeft:"5px",marginTop:"5px",fontWeight:"bold"}}>Home</Button>
                </Link>
                <LoginPart/>
                <Divider></Divider>
            </div>
            <div className="search" style={{width:"50%",margin:"auto",marginTop:"200px"}}>
            {/* Ask the Customer Location  */}
                <Jumbotron style={{backgroundColor:"transparent"}}>
                    <span style={{fontSize:"25px", marginLeft: "300px",fontWeight:"bold"}}>Before we began</span>
                    <h1 style={{marginLeft:"245px",fontSize:"25px",fontWeight:"bold"}}>TELL US WHERE YOU ARE</h1>
                    <br></br>
                    <Input style={{padding: "10px",width:"55%",marginTop:"30px", borderRadius: "5px", marginLeft: "125px"}}></Input>
                    <Link to="/Customer/Location">
                        <Button  variant="primary" style={{padding: "7px"}}><SearchOutlined style={{fontSize: "25px"}}/></Button>
                    </Link>
                </Jumbotron>
            </div>
        </div>
    )
}
