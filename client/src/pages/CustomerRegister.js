import { message,Divider,Card } from 'antd';
import React, {useState} from 'react'
import {Button,Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../common/axios'
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "../img/coffeeBean.jpeg"

// The page for user to register
export default function CustomerRegister(props) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [givenName,setGiven] = useState('')
    const [familyName,setFamily] = useState('')


    const onClick=()=>{
        axios.post('/user/register',{givenName:givenName,familyName:familyName,email:email,password:password}).then((response)=>{
            if(response.data.success){
                props.history.push("/Customer/Login")
            }else{
                message.error(response.data.error)
            }
        })
    }
    
    // register form for user to enter details
    return (
        <div style={{backgroundImage: `url(${background})`,backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh' }}>
            {/* Back to the Customer Home Page */}
            <div >
                <Link to="/Customer/Login">
                    <Button variant="link" style={{float:"Left",marginLeft:"5px",marginTop:"5px",color:"whitesmoke"}}>Back</Button>
                </Link>
                <Divider></Divider>
            </div>
            {/* Login form */}
            <div style={{position: 'absolute', left: '49.5%', top: '50%', transform: 'translate(-50%, -50%)',width:"25%"}}>
                <Card style={{borderRadius:"12px", borderColor:"lightgray"}}>
                <h2 style={{color:"black",textAlign:"center"}}>Register For Free</h2>
                <Form>
                    <Form.Group controlId="formBasicGiven">
                        <Form.Label style={{fontSize:"20px"}}>Given name</Form.Label>
                        <Form.Control type="text" placeholder="Enter given name"
                         onChange={e=>setGiven(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicFamily">
                        <Form.Label style={{fontSize:"20px"}}>Family name</Form.Label>
                        <Form.Control type="text" placeholder="Enter family name"
                         onChange={e=>setFamily(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{fontSize:"20px"}}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                         onChange ={e=>setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{fontSize:"20px"}}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                        onChange = {e=>setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" onClick={onClick}>
                        Register
                    </Button>
                </Form>
                </Card>
            </div>
        </div>
    )
}
