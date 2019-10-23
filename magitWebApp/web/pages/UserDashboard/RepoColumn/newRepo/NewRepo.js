import React from 'react';
import Button from 'react-bootstrap/Button';
import './newRepo.css';


function NewRepo (props){
    return(
        <Button id="newBtn" onClick={props.onClick} size={"sm"}>New</Button>);
}
export default NewRepo;