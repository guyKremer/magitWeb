import React from 'react';
import SingleUser from './SingleUser/SingleUser';
import Button from 'react-bootstrap/Button';
import './users.css';


function Users(props) {

    const onlineUsers = props.onlineUsers.map((userName) => {
        return (<Button variant={"link"}>{userName}</Button>);
    });

    if ((props.onlineUsers === undefined || props.onlineUsers.length == 0)){
        return (
            <h3>No Other Active Users</h3>
        );
    } else {
        return (
            <div className={"users"}>
                <b>Users</b>
                {onlineUsers}
            </div>
        );
    }
}

export default Users;
