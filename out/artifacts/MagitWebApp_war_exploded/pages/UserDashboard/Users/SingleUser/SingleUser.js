import React from 'react';
import Button from 'react-bootstrap/Button';
import './singleUser.css';

function SingleUser(props) {

    return(
        <div className={"singleUser"}>
            <div className={"dot dot-"+ props.status}/>
            <Button variant={"link"}>{props.userName}</Button>
        </div>

    );
}
export default SingleUser