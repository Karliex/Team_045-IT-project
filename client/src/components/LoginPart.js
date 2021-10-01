import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";
import { Divider,Drawer, Menu, Dropdown, message} from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import axios from '../common/axios'
import OrderList from  '../components/OrderList'

// The login component for users
export default function LoginPart() {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const handleDrawerClose = () => setDrawerVisible(false) 
    const handleDrawerShow= () => setDrawerVisible(true) 
    const [orders, setOrders] = useState([]);
    const [isLogin,setLogin]=useState(false)

    useEffect(() => {
        if (localStorage.getItem("userID")!==null){
            axios.get('/order?user='+ localStorage.getItem("userID")).then(response=>{
                if(response.data.success){
                    setOrders(response.data.order)
                }
            })
        }
    },[])

    useEffect(()=>{
        axios.post("/user",{token:localStorage.getItem("jwtToken")}).then(response=>{
            if(response.data.status==="10000"){
                setLogin(true)
            }
        })
    })

    // For user to logout 
    const logOut=() =>{
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("userID")
        localStorage.removeItem("name")
        setLogin(false)
        message.info("You are successfully logout")
    }

    // The usermenu
    const usermenu = (
        <Menu theme = "light" style={{float:"right",marginRight:"5px"}}>
          <Menu.Item>
            <Link to="/Customer/Profile">
                <Button variant="Link" style={{fontWeight:"bold"}}>Profile</Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">
                <Button variant="Link" style={{fontWeight:"bold"}} onClick={logOut}>
                    Logout
                </Button>
            </Link>
          </Menu.Item>
        </Menu>
    );
    
    // If the user logined, loading the user orders
    const checkLogin=()=>{
        if(isLogin){
            return  <div>
                    <Button variant="Link" key="1" onClick={handleDrawerShow} style={{float:"right",marginLeft:"5px",marginTop:"5px",fontWeight:"bold"}}>See Orders</Button>
                    <Drawer visible={drawerVisible}
                        closable = {true}
                        onClose={handleDrawerClose}
                        width={"40vw"}>
                        <span style={{fontSize:"20px",fontWeight:"bold"}}>All Orders</span>
                        <Divider />
                        <OrderList target={"user"} id={localStorage.getItem("userID")} orders = {orders} status={""}/>
                    </Drawer>
                    <Dropdown overlay={usermenu} placement="bottomCenter">
                        <Button variant="Link" style={{float:"right",marginRight:"5px",marginTop:"5px",fontWeight:"bold"}}>{localStorage.getItem("name")}</Button>
                    </Dropdown>
                    </div>
        }else{
            return  <Link to="/Customer/Login">
                        <Button variant="Link" style={{float:"right",marginRight:"5px",marginTop:"5px",fontWeight:"bold"}}>Login</Button>
                    </Link>
        }
    }

    return (
        <div>
            {checkLogin()}
        </div>
    )
}
