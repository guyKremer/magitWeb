import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login/Login';
import Consts from'./Constants';
import Main from './UserDashboard/UserDashboard';
import { Nav, Navbar } from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SingleRepository from './SingleRepository/SingleRepository';
import Bar from '../pages/Bar';

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
            chosenRepoName:"",
            choserRepoType:"",
            RRname:"",
            RRuser:""
        }
        this.loginHandler = this.loginHandler.bind(this);
        this.repoChoosingHandler = this.repoChoosingHandler.bind(this);
        this.homeHandler=this.homeHandler.bind(this);
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
                <React.Fragment>
                    <Bar homeHandler={this.homeHandler} userName={this.state.userName}/>
                    <SingleRepository backOnClick={this.homeHandler} type={this.state.choserRepoType} RRname={this.state.RRname} RRuser={this.state.RRuser} repoName={this.state.chosenRepoName}/>
                </React.Fragment>
            )
        }
    }

    homeHandler(){
        this.setState(()=> ({
            location: Consts.MAIN,
        }));
    }
    loginHandler(userName){
        this.setState(()=> ({
            location: Consts.MAIN,
            userName:userName
        }));
    }

    repoChoosingHandler(repoName,repoType,RRname,RRuser){
        this.setState(()=> ({
            location: Consts.SINGLE_REPO,
            chosenRepoName:repoName,
            RRname:RRname,
            choserRepoType:repoType,
            RRuser:RRuser
        }));
    }
}