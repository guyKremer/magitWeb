import React from 'react';
import RepoColumn from './RepoColumn/RepoColumn';
import MessagesBoard from './MessagesBoard/MessagesBoard';
import Users from './Users/Users';
import { Nav, Navbar } from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import UserRepositories from './UserRepositories/UserRepositories';
import Bar from '../Bar';
import './main.css'

export default class UserDashboard extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            userPressed:false,
            pressedUserRepos:[],
            pressedUserName:"",
            userName:props.userName,
            onlineUsers:[],
            messages:[],
            repositories:[]
        };

        this.getUserData=this.getUserData.bind(this);
        this.userOnClickHandler=this.userOnClickHandler.bind(this);

    }

    componentDidMount() {
        this.getUserData();
        setInterval(async ()=>{
            this.getUserData();
        }, 1000);
    }

    render(){
        if(this.state.userPressed === false){
            return(
                <React.Fragment>
                    <Bar homeHandler={()=>this.setState(()=>({userPressed:false}))} userName={this.state.userName}/>
                    <div id="main">
                        <RepoColumn repoChoosingHandler={this.props.repoChoosingHandler} repositories={this.state.repositories} userName={this.state.userName}/>
                        <MessagesBoard messages={this.state.messages}/>
                        <Users selfName={this.state.userName} onClick={this.userOnClickHandler} onlineUsers={this.state.onlineUsers}/>
                     </div>
                </React.Fragment>
            );
        }
        else{
            return(
            <React.Fragment>
             <Bar homeHandler={()=>this.setState(()=>({userPressed:false}))} userName={this.state.userName}/>
             <UserRepositories backOnclick={()=>this.setState(()=>({userPressed:false}))} forkOnClick={()=>this.setState(()=>({userPressed:false}))} userName={this.state.pressedUserName} userRepos={this.state.pressedUserRepos} />
            </React.Fragment>
            );
                }
    }

    async userOnClickHandler(userName){
        let repoResponse = await fetch('repositories?userName='+userName, {method:'GET', credentials: 'include'});
        repoResponse=await repoResponse.json();
        this.setState(()=>({
            userPressed:true,
            pressedUserRepos:repoResponse,
            pressedUserName:userName
        }));
    }

    async getUserData(){
        let messagesRespone = await fetch('messages', {method:'GET', credentials: 'include'});
        let repoResponse = await fetch('repositories?userName='+this.state.userName, {method:'GET', credentials: 'include'});
        let usersResponse = await fetch('users', {method:'GET', credentials: 'include'});
        usersResponse = await usersResponse.json();
        repoResponse = await repoResponse.json();
        messagesRespone=await messagesRespone.json();
        this.setState(()=>({
            onlineUsers:usersResponse,
            repositories:repoResponse,
            messages: messagesRespone
        }));
    }
}