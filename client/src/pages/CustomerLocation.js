import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";
import { Divider, Card,Row, Col} from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import axios from '../common/axios'
import LeafletMap from "../components/LeafletMap"
import LoginPart from "../components/LoginPart"
// Get the location of the user
export default function CustomerLocation() {
    const lat=localStorage.getItem("lat")
    const lng=localStorage.getItem("lng")
    const [vendors, setVendors] = useState([])
    useEffect(() => {
        axios.get('/vendor?lat='+lat+'&lng='+lng).then((response) =>{
            setVendors(response.data.vendors)
        });
    }, [lat, lng])
    return (
        // Choose the vendor from nearest five vendors
        <div className="CustomerLocation">
            <div>
                <Link to="/">
                    <Button variant="Link" style={{float:"Left",marginLeft:"5px",marginTop:"5px",fontWeight:"bold"}}>Back</Button>
                </Link>
                <LoginPart/>
                <Divider/>
            </div>
            {/* <LeafletMap/> */}
            <div>
                <Row>
                    <Col flex="60vw" style={{marginLeft:"2vw"}}>
                        <LeafletMap 
                        center={[lat,lng]} vendors={vendors}/>
                    </Col>
                    <Col flex="auto" style={{marginLeft:"5vw",marginRight:"1vw"}}>
                        <h4>Five Nearest Vendors</h4>
                        <Divider/>
                        {
                            vendors.map((vendor)=>(
                                <>
                                <Card hoverable title={vendor.name}  extra={<a href="/Customer/Menu" onClick={()=>localStorage.setItem("vendorID",vendor.id)}>See menu </a>} style={{ width: 300,marginLeft:"1vw" }}>
                                    <p>{vendor.curAddress}</p>
                                </Card>
                                <br/>
                                </>
                            ))
                        }
                    </Col>
                    
                </Row>
        </div>
        </div>
    )
}
