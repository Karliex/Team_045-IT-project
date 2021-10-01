import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";
import {message} from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import axios from '../common/axios'

export default function VLoginPart() {
    const [isLogin,setLogin]=useState(false)

    useEffect(()=>{
        axios.post("/vendor/loginState",{token:localStorage.getItem("vjwtToken")}).then(response=>{
            if(response.data.status==="10000"){
                setLogin(true)
            }
        })
    })

    const logout = () =>{
        localStorage.removeItem('vjwtToken');
        localStorage.removeItem('vName');
        localStorage.removeItem('vid');
        setLogin(false);
        message.info("You are successfully logout");
    }

    const checkLogin = () =>{
        if(isLogin){
            return  <div>
                        <Link to="/">
                            <Button variant="Link" style={{float:"right",marginLeft:"5px",marginTop:"5px",fontWeight:"bold"}} onClick={logout}>Logout</Button>
                        </Link>
                        <Button variant="Link" style={{float:"right",marginRight:"5px",marginTop:"5px",fontWeight:"bold"}}>{localStorage.getItem("vName")}</Button>
                    </div>  
        }
    }
    
    return (
        <div>
            {checkLogin()}
        </div>
    )
}
