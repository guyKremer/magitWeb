import React from 'react';
import SingleUser from './SingleUser/SingleUser';
import Button from 'react-bootstrap/Button';
import './users.css';


function Users(props) {

    const onlineUsers = props.onlineUsers.map((userName) => {
        return (<Button variant={"link"}>{userName}</Button>);
    });
        return (
            <div className={"users"}>
                <b>Users</b>
                {onlineUsers}
            </div>
        );
}

export default Users;
