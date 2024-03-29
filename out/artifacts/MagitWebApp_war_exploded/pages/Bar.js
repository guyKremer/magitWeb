import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function Bar(props) {

return(
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand>MagitHub</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link onClick={props.homeHandler}>Home</Nav.Link>
        </Nav>
        <Dropdown as={ButtonToolbar}>
            <DropdownButton variant= "secondary"title={props.userName} size="sm">
                <Dropdown.Item onClick={props.logutHandler}>Logout</Dropdown.Item>
            </DropdownButton>
        </Dropdown>
    </Navbar>
    );
}
export default Bar;