import { FormGroup } from '@material-ui/core'
import { Button } from 'bootstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container
} from 'reactstrap'

export class Heading extends Component {


    render() {
        return (
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand href="/adminHome">My company</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <Link className="btn btn-primary" to="/signup">Add user</Link>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default Heading
