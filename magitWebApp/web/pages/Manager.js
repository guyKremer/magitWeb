import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login/Login';
import Consts from'./Constants';
import Main from './main/Main'



export default class BaseContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            location:props.location,
            userName:null
        }
        this.loginHandler = this.loginHandler.bind(this);
    }

    render() {
        if(this.state.location === Consts.LOGIN){
            return <Login handleLogin={this.loginHandler}/>
        }
        else if(this.state.location===Consts.MAIN){
            return <Main userName={this.state.userName}/>
        }
    }

    loginHandler(userName){
        this.setState(()=> ({
            location: Consts.MAIN,
            userName:userName
        }));
    }


}