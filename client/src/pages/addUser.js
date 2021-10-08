import React, { useState, useContext } from 'react';
import { GlobalContext } from './globalStates';
import { v4 as uuid } from "uuid";
import { Link, useHistory } from "react-router-dom";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";

// For administrator to add users
export const AddUser = () => {
    const [name, setName] = useState('');
    const { addUser } = useContext(GlobalContext);
    const history = useHistory();

    // the action when submit
    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            id: uuid(),
            name
        }
        addUser(newUser);
        history.push("/adminHome");

        axios.post('http://localhost:4000/user/signup', registered).then(function (response) {
            if (response.data.redirect === '/adminHome') {
                window.location = "/adminHome"
            } else if (response.data.redirect === '/signup'){
                window.location = "/signup"
            }
        })
        .catch(function(error) {
            window.location = "/signup"
        })
          this.setState({
              email:'',
              password:''
          })
    }

    const onChange = (e) => {
        setName(e.target.value);
    }

    return (
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label>Name</Label>
                <Input type="text" value={name} onChange={onChange} name="name" 
                placeholder="Enter user" required></Input>
            </FormGroup>
            <Button type="submit">Submit</Button>
            <Link to="/adminHome" className="btn btn-danger ml-2">Cancel</Link>
        </Form>
    )
}

export default AddUser;