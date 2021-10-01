import React from 'react'
import VLoginPart from "../components/VLoginPart"
import LeafletMap from "../components/LeafletMap"
import {Divider} from 'antd';
import {Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function VendorLocaiton() {

    const lat=localStorage.getItem("lat")
    const lng=localStorage.getItem("lng")
    return (
        <div>
            <Link to="/">
                <Button variant="Link" style={{float:"Left",marginLeft:"5px",marginTop:"5px",fontWeight:"bold"}}>Back</Button>
            </Link>
            <VLoginPart/>
            <Divider/>
            <LeafletMap center={[lat,lng]} vendors={[]}/>
        </div>
    )
}
