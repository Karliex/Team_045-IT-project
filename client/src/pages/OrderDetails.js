import React from 'react'
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";
import {Divider} from "antd"
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPart from "../components/LoginPart"

// successfully created the order
export default function OrderDetails() {
    return (
        <div>
            <LoginPart></LoginPart>
            <Divider></Divider>
            <h1>You have placed an order successfully!</h1>
            <Link to="/Customer/Menu">
                    <Button variant="Link" style={{float:"Left",marginLeft:"5px",marginTop:"5px",fontWeight:"bold"}}>Back To Menu</Button>
            </Link>
        </div>
    )
}
