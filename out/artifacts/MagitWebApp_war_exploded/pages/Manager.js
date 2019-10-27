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
                <React.Fragment>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand onClick={this.homeHandler}>MagitHub</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>

                        </Nav>
                        <Dropdown as={ButtonToolbar}>
                            <DropdownButton variant= "secondary"title={this.state.userName} size="sm">
                                <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                    </Navbar>
                    <Main repoChoosingHandler={this.repoChoosingHandler} userName={this.state.userName}/>
                </React.Fragment>
            );
        }
        else{
            return (
                <React.Fragment>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">MagitHub</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>

                        </Nav>
                        <Dropdown as={ButtonToolbar}>
                            <DropdownButton variant= "secondary"title={this.state.userName} size="sm">
                                <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                    </Navbar>
                    <SingleRepository repoName={this.state.chosenRepoName}/>
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

    repoChoosingHandler(repoName){
        this.setState(()=> ({
            location: Consts.SINGLE_REPO,
            chosenRepoName:repoName
        }));
    }
}