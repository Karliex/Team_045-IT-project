import React, { Component } from 'react'
import {Typography} from "antd";
import "antd/dist/antd.css";

export default class Timers extends Component {
    constructor(props){
        super();
        this.state ={
            min : "",
            sec : ""
        }
    }

    tick() {
        let now = new Date();
        let update = Date.parse(this.props.updatedAt)
        this.setState({min: parseInt((now-update)/60000)})
        let sec =  ((now-update)-this.state.min * 60000)/1000
        this.setState({sec:parseInt(sec)})
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),1000
        ) 
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    render() {
        return (
            <div>
                <Typography strong={true}>{"It has been "+this.state.min+" minutes "+this.state.sec+" seconds"}</Typography>
            </div>
        )
    }
}
