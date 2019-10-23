import React from 'react';
import SingleUser from './SingleUser/SingleUser';
import './users.css';


function Users(props) {

    const onlineUsers = props.onlineUsers.map((user) => {
        return (<SingleUser userName={user} status={"online"}></SingleUser>);
    });
    const offlineUsers = props.offlineUsers.map((user) => {
        return (<SingleUser userName={user} status={"offline"}></SingleUser>);
    });

    if ((props.onlineUsers === undefined || props.onlineUsers.length == 0) && (props.offlineUsers === undefined || props.offlineUsers.length == 0)) {
        return (
            <h3>No Other Active Users</h3>
        );
    } else {
        return (
            <div className={"users"}>
                <b>Online Users</b>
                <ul>{onlineUsers}</ul>
                <b>Offline Users</b>
                <ul>{offlineUsers}</ul>
            </div>
        );
    }
}

export default Users;
