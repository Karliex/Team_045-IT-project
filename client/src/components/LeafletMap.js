import React,{useState,useMemo} from 'react'
import {useHistory} from "react-router-dom"
import {Icon} from "leaflet"
import {MapContainer as Map, TileLayer, Marker,Popup } from "react-leaflet"
import {Button,Form,Modal} from 'react-bootstrap'
import {message} from "antd"
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import icons from "../img/coffee-shop.svg"
import holders from "../img/placeholder.svg"
import axios from '../common/axios'

// Using the leafletMap to locate the user current location
export default function LeafletMap(props) {
    const markers = new Icon({
        iconUrl : icons,
        iconSize : [40,40]
    })
    const holder = new Icon({
        iconUrl : holders,
        iconSize : [40,40]
    })
    let history = useHistory()
    const [show,setShow] = useState(false)
    const handleClose =()=> setShow(false)
    const handleShow =()=> setShow(true)
    const [add,setAdd] = useState("")
    const [position,setPosition] = useState(props.center)
    const eventHandler = useMemo(
        (e)=>({
            dragend(e){
                console.log(e.target.getLatLng())
                setPosition(e.target.getLatLng())
            },
            click() {
                handleShow();
            }
        }),
        [],
    )
    
    const Parking = () =>{
        axios.post('/vendor/park/'+localStorage.getItem("vid"),{
            curAddress:add,
            location:[position.lat,position.lng],
            parked:true
        }).then((response)=>{
            message.success("You have parked successfully!")
            history.push({pathname:"/Vendor/Main"})
        })
    }

    const rendorFiveVendors = props.vendors.map((vendor)=>{
        return (
            <Marker key={vendor.id} position={vendor.location} icon={markers}>
                <Popup>
                    {vendor.name+" - "+vendor.curAddress}
                </Popup>
            </Marker>
        )
    })

    const rendorCustomer = (
        <Marker position={props.center} icon={holder}>
            <Popup>
                Your location!
            </Popup>
        </Marker>
    )

    const rendorVendor = (
        <Marker draggable={true} 
                eventHandlers={eventHandler} 
                position={position}>
        </Marker>
    )

    return (
        <div>
            <Modal show={show} onHide={handleClose} style={{marginTop:"2vh"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Vendor Parking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasciAdd">
                            <Form.Label>Your current Address:</Form.Label>
                            <Form.Control type="text" placeholder="Enter address"
                            onChange={e=>setAdd(e.target.value)}/>
                            <Form.Text className="text-muted">
                                Enter description of your address so that customers can get to it!
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={Parking}>Confirm</Button>
                </Modal.Footer>
            </Modal>
            <Map center={props.center} zoom={17} scrollWheelZoom={false} style={{height:"90vh"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {(history.location.pathname === "/Vendor/Location") ? rendorVendor : <></>}
                {(history.location.pathname === "/Customer/Location") ? rendorCustomer : <></>}
                {(history.location.pathname === "/Customer/Location") ? rendorFiveVendors : <></>}
            </Map>
        </div>
    )
}

