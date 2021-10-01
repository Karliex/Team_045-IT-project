import React,{ Component , useEffect,useState} from "react";
import axios from '../common/axios';
import URLs from "../url";
import io from "socket.io-client"
import OrderBrief from  '../components/OrderBrief'
import {Empty } from "antd";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";


function Orders(props){
    const [orders,setOrders] = useState([])
    const id = props.id;
    useEffect(() =>{
        async function fetchData(){
            axios.get("/order?"+props.target+"="+id+props.status).then(response=>{
                if(response.data.success){
                    setOrders(response.data.order)
                }else{
                    setOrders([])
                }
            }).catch(error =>{
                setOrders([]);
            })
        }
        fetchData()
    },[id,orders,props.target,props.status])


    const renderOrders =orders.map((order, index)=>{
    return(
        <OrderBrief
            key = {order._id}
            order = {order}
        />
        )
    })

    return (
        <div>
            {
                (orders.length > 0) ? renderOrders
                    : <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    description={<span>No orders yet</span>}
                  />
            }
        </div>
    )
}

export default class OrderList extends Component {
    constructor(props){
        super();
        this.state = {
            orders: [],
        }
    }

    componentDidMount() {
        const socket = io(`${URLs.socketURL}/socket`,{transports :['websocket']});
        socket.on("newOrder",(order)=>{
            console.log("insertion detected at frontend");
            this.setState({orders:[...this.state.orders,order]})
        })
        socket.on("updateOrder",(id)=>{
            console.log("update detected at frontend");
            console.log(id);
        })
        socket.on("deleteOrder",(id)=>{
            console.log("deletion detected at frontend");
            const updateOrders = this.state.orders.filter((order)=>{
                return order._id !== id;
            });
            this.setState({orders:updateOrders})
        })
    }

    render() {
        return (
            <div style ={{height:"100vh",margin:"auto",marginTop:"2vh",marginRight:"1vw",marginLeft:"1vw"}}>
                <Orders id={this.props.id} orders={this.state.orders} target={this.props.target} status={this.props.status}></Orders>
            </div>
        )
    }
}
