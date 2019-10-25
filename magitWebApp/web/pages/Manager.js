import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login/Login';
import Consts from'./Constants';
import Main from './UserDashboard/UserDashboard';
import SingleRepository from './SingleRepository/SingleRepository';

import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class BaseContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            location:props.location,
            userName:"",
            chosenRepoName:""
        }
        this.loginHandler = this.loginHandler.bind(this);
        this.repoChoosingHandler = this.repoChoosingHandler.bind(this);
    }

    render() {

        if(this.state.location === Consts.LOGIN){
            return(
                <Login handleLogin={this.loginHandler}/>
                );
        }
        else if(this.state.location === Consts.MAIN) {
            return(
                <Main repoChoosingHandler={this.repoChoosingHandler} userName={this.state.userName}/>
            );
        }
        else{
            return (
                <SingleRepository repoName={this.state.chosenRepoName}/>
            )
        }
    }

    loginHandler(userName){
        this.setState(()=> ({
            location: Consts.MAIN,
            userName:userName
        }));
    }

    repoChoosingHandler(repoName){
        this.setState(()=> ({
            location: Consts.SINGLE_REPO,
            chosenRepoName:repoName
        }));
    }
}