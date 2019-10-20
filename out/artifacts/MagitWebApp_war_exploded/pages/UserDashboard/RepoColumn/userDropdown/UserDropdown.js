import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';

function UserDropdown(props){

    return(
        <Dropdown as={ButtonToolbar}>
            <DropdownButton title={props.userName} variant="success" size="sm">
                <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
            </DropdownButton>
        </Dropdown>
    )
}
export default UserDropdown;

