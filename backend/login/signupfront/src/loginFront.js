import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class loginFront extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            password:''
        }
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    changeUsername(event){
        this.setState({
            username:event.target.value
        })
    }
    
    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault()

        const loged = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:4000/app/login', loged)
            .then(response => console.log(response.data))

        // window.location = '/'
        this.setState({
            username:'',
            password:''
        })
    }  

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type = 'text'
                            placeholder='Username'
                            onChange={this.changeUsername}
                            value={this.state.username}
                            className='form-control form-group'
                            />

                            <input type='password'
                            placeholder='Password'
                            onChange={this.changePassword}
                            value={this.state.password}
                            className='form-control form-group'
                            />
                            <input type='submit' className='btn btn-danger btn-block' value='Submit' />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default loginFront;