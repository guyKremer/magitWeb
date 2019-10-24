import React from 'react';
import RepoColumn from './RepoColumn/RepoColumn';
import MessagesBoard from './MessagesBoard/MessagesBoard';
import Users from './Users/Users';
import { Nav, Navbar } from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './main.css'

export default class UserDashboard extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            userName:this.props.userName,
            onlineUsers:[],
            messeages:null
        };
        this.getUsersNames=this.getUsersNames.bind(this);
    }


    componentDidMount() {
        this.getUsersNames();
        setInterval(async ()=>{
            this.getUsersNames()
        }, 5000);
    }


    render(){
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
                <div id="main">
                    <RepoColumn userName={this.state.userName}/>
                    <MessagesBoard/>
                    <Users onlineUsers={this.state.onlineUsers}/>
                </div>
            </React.Fragment>
         )
    }

    async getUsersNames(){
        let response = await fetch('users', {method:'GET', credentials: 'include'});
        let jsonResponse = await response.json();
        this.setState(()=>({
            onlineUsers:jsonResponse
        }));
    }
}