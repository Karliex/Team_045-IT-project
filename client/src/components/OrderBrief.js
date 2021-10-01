import React, { Component } from 'react'
import {Card, Button,Modal,notification,InputNumber, Divider, message,Rate,Input,Badge} from 'antd'
import { EditOutlined, EyeOutlined,RightOutlined} from '@ant-design/icons';
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import Timers from '../components/Timers'
import axios from '../common/axios';
const { TextArea } = Input;
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export default class OrderBrief extends Component {
    constructor(props){
        super();
        this.state= {
            menu : [],
            order : [],
            modalVisible: false,
            editModalVisible: false,
            modalBody: <></>,
            diff: "",
            ratings: 0,
            comment: ""
        }
    }
  
    handleClose = () => this.setState({modalVisible:false})
    handleShow = () => this.setState({modalVisible:true})

    handleEditClose = () => this.setState({editModalVisible:false})
    handleEditShow =() => this.setState({editModalVisible:true})

    tick() {
        let now = new Date().getTime()
        let update = Date.parse(this.props.order.updatedAt)
        this.setState({diff:((now-update)/60000)})
    }

    componentDidMount() {
        axios.get('/snack/menu').then((response) =>{
            this.setState({menu:response.data.snacks})
        })
        this.timerID = setInterval(()=>this.tick(),1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    handleShowDetials = () =>{
        console.log(this.props.order)
    }

    handleEditOrder = () =>{
        if(this.props.order.status === "outstanding" && this.state.diff<=10){
            this.setState({editModalVisible:true})
        }
        if(this.props.order.status === "fulfilled"){
            notification.open({
                message : "Order is ready to be collected!",
                description: "You can only update your order within 10 minutes after you ordered it",
                duration: 3
            });
        }else if (this.props.order.status === "outstanding" && this.state.diff > 10){
            notification.open({
                message: "Order is being processed!",
                description: "You can only update your order within 10 minutes after you ordered it",
                duration: 3
            });
        }else{
            if(this.props.order.comment && this.props.order.ratings){
                message.info("You have already commented!")
            }else{
                console.log(this.props.order)
                this.setState({editModalVisible:true})
            }
        }
    }

    onChange = (index, event) =>{
        let newArray = [...this.state.order]
        newArray[index] = event
        console.log(newArray)
        this.setState({order:newArray})
    }

    calcTotal=() =>{
        var output=0
        for (let i=0;i<this.state.order.length;i++){
            if(this.state.order[i]!==undefined){
                output+=parseFloat(this.state.menu[i].price)*this.state.order[i]
            }
        }
        return output;
    }
    
    onChangeOrderSubmit = () =>{
        var prices = 0
        var submitOrder = []
        for (let i = 0; i <this.state.order.length; i++){
            if (this.state.order[i]!==undefined){
                if(this.state.order[i]!==0){
                    var obj = {}
                    obj[this.state.menu[i].snackName]=this.state.order[i]
                    submitOrder.push(obj)
                    prices+=parseFloat(this.state.menu[i].price)*this.state.order[i]
                }
            }
        }
        if(submitOrder.length === 0){
            this.setState({editModalVisible:false})
            message.error("You must choose more than one snack")
        }else{
            axios.post('/order/update/'+this.props.order._id, {
                snacks: submitOrder,
                status: this.props.order.status,
                prices: prices
            }).then(response => {
                if (response.data.success) {
                    message.success("Order has been changed and placed!");
                    this.setState({editModalVisible:false})
                } else {
                    message.error("An error in order placement!");
                }
            });
        }

    }

    ratingsChange = (value) =>{
        console.log(value)
        this.setState({ratings:value})
    }

    commentChange = (value) =>{
        this.setState({comment:value})
    }

    onCommentSubmit = () => {
        console.log(this.props.order)
        axios.post('/order/update/'+this.props.order._id, {
            comment:this.state.comment,
            ratings:this.state.ratings
        }).then(response => {
            if (response.data.success) {
                message.success("Your feedback has been reocrded!");
                this.setState({editModalVisible:false})
            } else {
                message.error("An error in recording feedback!");
            }
        });
    }

    renderEditModalBody = () =>{
        if (this.props.order.status === "outstanding"){
            return (
                <>
                    <Modal visible={this.state.editModalVisible} title={"Menu"} onOk={()=>this.handleEditClose()} onCancel={()=>this.handleEditClose()} footer={[
                    <Button key="back" onClick={()=>this.onChangeOrderSubmit()} type="primary">
                        OK
                    </Button>]}>
                        {
                            this.state.menu.map((snack,index)=>(
                                <div>
                                    <p>
                                        {snack.snackName+" $ "+snack.price}
                                        <InputNumber min={0} max={20} defaultValue={0} size="small" onChange={e=>this.onChange(index,e)} style={{float:"right",width:"25%"}}></InputNumber>
                                    </p>
                                </div>
   
                            ))                            
                        }
                        {
                            (this.calcTotal()!==0) ? <div><Divider/><span style={{fontSize:"20px"}}>{"Total: $"+this.calcTotal()}</span></div> : <></>
                        }
                    </Modal>

                </>
            )
        }else{
            return (
                <>
                    <Modal visible={this.state.editModalVisible} title={"OrderID: "+this.props.order._id+" - "+this.props.order.status} onOk={()=>this.handleEditClose()} onCancel={()=>this.handleEditClose()} footer={[
                    <Button key="back" onClick={()=>this.onCommentSubmit()} type="primary">
                        OK
                    </Button>]}>
                        <p>Order By:
                            <p>Given Name  : {this.props.order.user.givenName}<br/>
                            Family Name : {this.props.order.user.familyName}</p>
                        </p>
                        <p>Taken By:
                            <p>Vendor : {this.props.order.vendor.name}</p>
                        </p>
                        <p>Ordered: {this.props.order.snacks.map((snack) => <li key = {Object.keys(snack)[0]}> {Object.keys(snack)[0]}   x{Object.values(snack)[0]}</li>)}</p>
                        <p>Prices: {"$ "+this.props.order.prices}</p>
                        <Divider></Divider>
                        <p>Your rating:</p><Rate tooltips={desc} onChange={(e)=>this.ratingsChange(e)}></Rate>
                        <p>Your comment:</p><TextArea rows={4} onChange={(e) =>this.commentChange(e.target.value)} />
                        {this.state.ratings ? <span className="ant-rate-text">{desc[this.state.ratings-1]}</span> : ''}
                    </Modal>

                </>
            )
        }
    }

    onMarkOrders = ()=> {
        var nextState = ""
        var discount = false
        var newprice = this.props.order.prices
        if(this.props.order.status==="outstanding"){
            nextState = "fulfilled"
            if (this.state.diff>= 15){
                discount = true
                newprice = parseFloat(this.props.order.prices)*0.8
            }
            axios.post('/order/update/'+this.props.order._id, {
                discount: discount,
                prices : newprice,
                status : nextState
            }).then(response => {
                if (response.data.success) {
                    message.success("Status has udpated!");
                    this.setState({editModalVisible:false})
                } else {
                    message.error("An error in status updating!");
                }
            });
        }else if(this.props.order.status === "fulfilled"){
            nextState = "completed"
            axios.post('/order/update/'+this.props.order._id, {
                status : nextState
            }).then(response => {
                if (response.data.success) {
                    message.success("Status has udpated!");
                    this.setState({editModalVisible:false})
                } else {
                    message.error("An error in status updating!");
                }
            });
        }else{
            notification.open({
                message: "Order is already completed",
                description: "You have completed this order",
                duration : 3
            })
        }
    }

    rendorAction = () =>{
        if(window.location.pathname.includes("/Vendor")){
            return (
                [
                    <EyeOutlined key="more" onClick={()=>this.handleShow()} />,
                    <RightOutlined key="edit"  onClick={()=>this.onMarkOrders()}/>
                ]
            )
        }else if(window.location.pathname.includes("/Customer")){
            return (
                [
                    <EyeOutlined key="more" onClick={()=>this.handleShow()} />,
                    <EditOutlined key="edit"  onClick={()=>this.handleEditOrder()}/>
                ]
            )
        }
    }

    render() {
        return (
            <div>
                <Modal visible={this.state.modalVisible} title={"OrderID: "+this.props.order._id+" - "+this.props.order.status} onOk={()=>this.handleClose()} onCancel={()=>this.handleClose()} footer={[
                <Button key="back" onClick={()=>this.handleClose()} type="primary">
                OK
                </Button>]}>
                    <p>Order By:
                        <p>Given Name  : {this.props.order.user.givenName}<br/>
                        Family Name : {this.props.order.user.familyName}</p>
                    </p>
                    <p>Taken By:
                        <p>Vendor : {this.props.order.vendor.name}</p>
                    </p>
                    <p>Ordered: {this.props.order.snacks.map((snack) => <li key = {Object.keys(snack)[0]}> {Object.keys(snack)[0]}   x{Object.values(snack)[0]}</li>)}</p>
                    <p>Price: {"$ "+this.props.order.prices}</p>
                    {
                        (this.props.order.status) === "fulfilled" ? "Order is fulfilled!"
                            : (this.props.order.status) === "completed" ? "Order is complete!"
                                : <Timers updatedAt = {this.props.order.updatedAt}></Timers>
                    }
                    {(this.props.order.ratings)?<div><Divider></Divider><p>Rating:</p><Rate disabled tooltips={desc} value={this.props.order.ratings}></Rate></div>:<></>}
                    <br></br>
                    {(this.props.order.comment)?<div><p>Comment:</p><>{this.props.order.comment}</></div> : <></>} 
                </Modal>
                {this.renderEditModalBody()}

                {(this.props.order.discount) 
                    ? <Badge.Ribbon text ="Discount Applied!">
                        <Card style={{marginBottom:"1vh"}} type="inner" title={"OrderID: "+this.props.order._id+" - "+this.props.order.status} 
                            actions={this.rendorAction()}
                            >
                            <p>Vendor: {this.props.order.vendor.name}</p>
                            <p>Ordered: {this.props.order.snacks.map((snack) => <li key = {Object.keys(snack)[0]}> {Object.keys(snack)[0]}   x{Object.values(snack)[0]}</li>)}</p>
                            <p>Price: {"$ "+this.props.order.prices}</p>
                            {
                                (this.props.order.status) === "fulfilled" ? "Order is fulfilled!"
                                    : (this.props.order.status) === "completed" ? "Order is complete!"
                                        : <Timers updatedAt = {this.props.order.updatedAt}></Timers>
                            } 
                        </Card>
                    </Badge.Ribbon>

                    : <Card style={{marginBottom:"1vh"}} type="inner" title={"OrderID: "+this.props.order._id+" - "+this.props.order.status} 
                    actions={this.rendorAction()}
                    >
                    <p>Vendor: {this.props.order.vendor.name}</p>
                    <p>Ordered: {this.props.order.snacks.map((snack) => <li key = {Object.keys(snack)[0]}> {Object.keys(snack)[0]}   x{Object.values(snack)[0]}</li>)}</p>
                    <p>Price: {"$ "+this.props.order.prices}</p>
                    {
                        (this.props.order.status) === "fulfilled" ? "Order is fulfilled!"
                            : (this.props.order.status) === "completed" ? "Order is complete!"
                                : <Timers updatedAt = {this.props.order.updatedAt}></Timers>
                    } 
                    </Card>
                }
                
            </div>
        )
    }
}
