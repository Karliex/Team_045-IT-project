import React, {useState,useEffect} from 'react'
import { Link} from "react-router-dom";
import {Divider,Button,Space} from 'antd';
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import VLoginPart from "../components/VLoginPart";
import OrderList from  '../components/OrderList'
import axios from '../common/axios'

export default function VendorMain(props) {
    const [orders,setOrders] = useState([]);
    const [status,setStatus] = useState('');

    useEffect(() => {
        if (localStorage.getItem("vid")!==null){
            axios.get('/order?vendor='+ localStorage.getItem("vid")).then(response=>{
                if(response.data.success){
                    setOrders(response.data.order)
                }
            })
        }
    },[])
    return (
        <div>
            <div>
                <Link to="/">
                    <Button type="text" style={{float:"left",marginLeft:"5px",marginTop:"5px",fontWeight:"bold"}}>Back</Button>
                </Link>
                <VLoginPart/>
                <Divider/>
            </div>
            <div>
                <Space style={{marginLeft:"1vw"}}>
                    Order Filter:
                    <Button onClick={()=>setStatus("&status=outstanding")}>Outstanding</Button>
                    <Button onClick={()=>setStatus("&status=fulfilled")}>Fulfilled</Button>
                    <Button onClick={()=>setStatus("&status=completed")}>Completed</Button>
                </Space>
            </div>
            <div>
                <OrderList target={"vendor"} id={localStorage.getItem("vid")} orders = {orders} status = {status}/>
            </div>
        </div>
    )
}
