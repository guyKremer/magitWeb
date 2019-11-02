import React from 'react';
import SingleUser from './SingleUser/SingleUser';
import Button from 'react-bootstrap/Button';
import './users.css';


function Users(props) {

    const onlineUsers = props.onlineUsers.map((userName) => {
        if(userName!==props.selfName){
            return (<Button key={"users"+userName} onClick={()=>{props.onClick(userName);}} variant={"link"}>{userName}</Button>);
        }
        else{
            return (<p key={"users"+userName}>{userName}</p>);
        }
    });
        return (
            <div className={"users"}>
                <b>Users</b>
                {onlineUsers}
            </div>
        );
}

export default Users;
