import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";
import { Card,Row,Col, Divider, InputNumber,message,Empty,notification} from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import axios from '../common/axios'
import LoginPart from "../components/LoginPart"


// the menu for customer to create order
export default function CustomerMenu(props) {
    const[menu,setMenu] = useState([])
    const [putorder,setPutorder] = useState([])


    //set the order and menu for this user
    useEffect(() => {
        axios.get('/snack/menu').then((response) =>{
            setMenu(response.data.snacks)
        })
    }, [])
    

    function printMsg() {message.error("You need to login before place an order");}

    //arrow function for posting order
    const Purchase = ()=>{
        if (localStorage.getItem("userID")===null){
            return <Button variant="outline-primary" style={{float:"right",marginRight:'0.5vw',marginTop:"2vh"}} onClick={printMsg}>Purchase</Button>
        } else{
            return  <Link to="/Customer/OrderDetails">
                        <Button variant="outline-primary" style={{float:"right",marginRight:'0.5vw',marginTop:"2vh"}} onClick={createOrder}>Purchase</Button>
                    </Link>
        }
    }

    // each orderlineitem in the cart
    const OrderLineItem = (putorder) =>{
        return (putorder.map((order,index)=>(
            order === undefined ? '' :
                order[1] === 0 ? '' :
                    <Card style={{marginBottom:"2vh"}}>
                        <span style={{fontWeight:"bold"}}>
                            {order[0]}
                            <span style={{fontWeight:"bold"}}>{" : x"+order[1]}
                                <span style={{float:'right',}}>{"$  "+parseFloat(menu[index].price)*order[1]}</span>
                            </span>
                        </span>
                    </Card>
        ))
        )
    }

    function calcTotal(){
        var output=0
        for (let i=0;i<8;i++){
            if(putorder[i]!==undefined){
                output+=menu[i].price*putorder[i][1]
            }
        }
        return output;
    }

    var submitOrder = []
    for (let i = 0; i <8; i++){
        if (putorder[i]!==undefined){
            if(putorder[i][1]!==0){
                var obj = {}
                obj[putorder[i][0]]=putorder[i][1]
                submitOrder.push(obj)
            }
        }
    }

    // create a new order
    function createOrder() {
        axios.post('order/create', {
            user: localStorage.getItem("userID"),
            vendor: localStorage.getItem("vendorID"),
            snacks: submitOrder,
            prices: calcTotal()
        }).then(response => {
            if (response.data.success) {
                notification.open({
                    message: "Order has been placed!",
                    description: "You can see the details or change the order from see orders",
                    duration: 3
                });
            } else {
                message.error("An error in order placement!");
            }
        });
    }

    const Chart=()=>{
        if (putorder.length===0||calcTotal()===0){
            return <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description={<span style={{fontSize:"20px"}}>Snack hasn't been added!</span>}
          />
        }else{
            return <div>
            <div style={{marginBottom:"1vh"}}>
                <span style={{fontWeight:"bold",marginLeft:"1vw",fontSize:"20px"}}>
                    Snack
                    <span style={{float:'right'}}>Price</span>
                </span>
            </div>
            {OrderLineItem(putorder)}
            <Divider/>
            <div style={{fontWeight:"bold",marginLeft:"1vw",fontSize:"20px"}}>
                <span>
                    Total
                    <span style={{marginRight:'1vw',float:'right'}}>{"$  "+calcTotal()}</span>
                </span> 
            </div>
            {Purchase()}
        </div>
        }
    }

    function removeVendor() {localStorage.removeItem("vendorID");}

    function updatePutorder(name,event,index) {
        let newOrder = [...putorder]
        newOrder[index] = [name,event]
        setPutorder(newOrder)
    }

    // each menu item 
    const MenuItem = (menu) =>{
        return (menu.map((snack,index)=>(
            <Col span={6}>
                <Card hoverable cover={<img alt="example" src={snack.photo} style={{width:"100%",height:"25vh"}}/>} style={{width:"14vw",height:"100%"}} key={snack._id}>
                    <span style={{fontWeight:"bold"}}>
                        {snack.snackName}
                        <span style={{fontWeight:"bold",float:'right'}}>{"$"+snack.price}</span>
                    </span>
                    <br></br>
                    <span style={{}}>
                        {snack.description}
                        <InputNumber min={0} max={20} defaultValue={0} size="small" onChange={e=>updatePutorder(snack.snackName,e,index)} style={{float:"right",width:"25%"}}></InputNumber>
                    </span>
                </Card>
            </Col>
            ))
        )
    }

    return (
        <>
        <div className="Menu">
            <div>
                <div>
                    <Link to="/Customer/Location">
                        <Button variant="Link" style={{float:"Left",marginLeft:"5px",marginTop:"5px",fontWeight:"bold"}} onClick={removeVendor}>Back</Button>
                    </Link>
                    <LoginPart/>
                    <Divider/>
                </div>
            </div>
            <div className="site-card-wrapper" >
                <Row>
                    <Col flex="70%">
                        <Row gutter={[8,24]} style={{marginLeft:"2vw", marginTop:"6vh"}}>
                            {MenuItem(menu)}
                        </Row>
                    </Col>
                    <Col flex="auto" style={{marginRight:"1vw"}}>
                        <h1>Cart</h1>
                        <Divider/>
                        {Chart()}
                    </Col>
                </Row>
            </div>
        </div>
        </>
    )
}
