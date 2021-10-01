import { message,Divider,Card } from 'antd';
import React, {useState} from 'react'
import {Button,Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../common/axios'
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "../img/coffeeBean.jpeg"
// when user click the login, jump to this page
export default function CustomerLogin(props){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    // using the local storage to store the login details
    
    const onClick=() =>{
        axios.post('/user/login',{email:email, password:password}).then(response =>{
            if (response.data.success){
                localStorage.setItem("jwtToken",response.data.token)
                localStorage.setItem("userID",response.data.user.id)
                localStorage.setItem("name",response.data.user.givenName)
                localStorage.setItem("familyname",response.data.user.familyName)
                localStorage.setItem("email",response.data.user.email)
                props.history.push('/Customer/Location',{
                    customer:response.data.user
                });
            } else{
                message.error(response.data.error)
            }
        }).catch(error =>{
            console.log(error)
        })
    }

    return(
        <div style={{backgroundImage: `url(${background})`,backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh' }}>
            {/* Back to the Customer Home Page */}
            <div >
                <Link to="/Customer">
                    <Button variant="link" style={{float:"Left",marginLeft:"5px",marginTop:"5px",color:"whitesmoke"}}>Back</Button>
                </Link>
                <Divider></Divider>
            </div>
            {/* Login form */}
            <div style={{position: 'absolute', left: '49.5%', top: '50%', transform: 'translate(-50%, -50%)',width:"25%"}}>
                <Card style={{borderRadius:"12px", borderColor:"lightgray"}}>
                <h2 style={{color:"black",textAlign:"center"}}>Login</h2>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{fontSize:"20px"}}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                        onChange ={e=>setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{fontSize:"20px"}}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                        onChange = {e=>setPassword(e.target.value)}/>
                        <a href="/Customer/Register">Register an account!</a>
                    </Form.Group>
                    
                    <Button variant="primary" onClick={onClick}>
                        Login
                    </Button>
                </Form>
                </Card>
            </div>
        </div>
        
    )
}