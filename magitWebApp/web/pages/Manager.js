import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login/Login';
import Consts from'./Constants';
import Main from './UserDashboard/UserDashboard';
import { Nav, Navbar } from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';





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
            return(
                <React.Fragment>
                    <Login handleLogin={this.loginHandler}/>)
                </React.Fragment>);

        }
        else if(this.state.location===Consts.MAIN){
            return(
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
                    <Main userName={this.state.userName}/>)
                </React.Fragment>);
        }
    }

    loginHandler(userName){
        this.setState(()=> ({
            location: Consts.MAIN,
            userName:userName
        }));
    }


}