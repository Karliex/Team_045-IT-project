import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
// import axios from 'axios'

class loginFront extends Component {
    


    render() {
        return (
            <div>
                <div className='container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type = 'text'
                            placeholder='Username'
                            //onChange={this.changeUsername}
                            //value={this.state.username}
                            className='form-control form-group'
                            />

                            <input type='password'
                            placeholder='Password'
                            //onChange={this.changePassword}
                            //value={this.state.password}
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