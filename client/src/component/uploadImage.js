import React, { Component } from 'react';
import axios from '../common/axios';
import Cookies from 'js-cookie';

export default class UploadImage extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pic: ''
        }
    }

    onFileChange(e) {
        this.setState({ pic: e.target.files[0] })
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('categoryImage', this.state.pic)
        axios.post("http://localhost:4000/user/uploadImage", formData, { headers: { Authorization:Cookies.get('SavedToken') }})
        .then(res => {
            console.log("hello")
            console.log(res)
        }).catch(() => {
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}