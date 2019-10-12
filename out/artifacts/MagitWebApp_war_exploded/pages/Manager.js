import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login/Login';


export default class BaseContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            location:props.location
        }
    }

    render() {
        if(this.state.location === 'login'){
            return <Login></Login>
        }
    }
}