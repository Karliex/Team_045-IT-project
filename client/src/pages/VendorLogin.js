import { message,Divider,Card } from 'antd';
import React, {useState} from 'react'
import {Button,Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../common/axios'
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "../img/MainBackground.png"

export default function VendorLogin(props) {
    const [vendor,setVendor] = useState('');
    const [password,setPassword] = useState('');


    const onClick=()=>{
        axios.post("/vendor/login",{name:vendor,password:password}).then((response)=>{
            if(response.data.success){
                localStorage.setItem("vjwtToken",response.data.token);
                localStorage.setItem("vName",response.data.user.name);
                localStorage.setItem("vid",response.data.user.id);
                props.history.push('/Vendor/Location',{
                    vendor:response.data.vendor
                });
            }else{
                message.error(response.data.error);
            }
        }).catch(error =>{
            console.log(error)
        })
    }

    return (
        <div style={{backgroundImage: `url(${background})`,backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh' }}>
            {/* Back to the Customer Home Page */}
            <div >
                <Link to="/">
                    <Button variant="Link" style={{float:"Left",marginLeft:"5px",marginTop:"5px",fontWeight:"bold"}}>Back</Button>
                </Link>
                <Divider></Divider>
            </div>
            {/* Login form */}
            <div style={{position: 'absolute', left: '49.5%', top: '50%', transform: 'translate(-50%, -50%)',width:"25%"}}>
                <Card style={{borderRadius:"12px", borderColor:"lightgray"}}>
                <h2 style={{color:"black",textAlign:"center"}}>Login</h2>
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label style={{fontSize:"20px"}}>Vendor Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter the vendor name"
                        onChange = {e=>setVendor(e.target.value)}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{fontSize:"20px"}}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                        onChange = {e=>setPassword(e.target.value)}/>
                    </Form.Group>
                    
                    <Button variant="primary" onClick = {onClick}>
                        Login
                    </Button>
                </Form>
                </Card>
            </div>
        </div>
    )
}
