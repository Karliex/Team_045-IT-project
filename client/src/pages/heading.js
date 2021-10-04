import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container
} from 'reactstrap';

// show the heading in the edit page of administrator
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

export default Heading;
