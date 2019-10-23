import React from 'react';
import RepoColumn from './RepoColumn/RepoColumn';
import MessagesBoard from './MessagesBoard/MessagesBoard';
import Users from './Users/Users';
import './main.css'

export default class UserDashboard extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            userName:this.props.userName,
            messeages:null,
        };
        this.getUserData=this.getUserData.bind(this);
    }

    /*
    componentDidMount() {
        this.getUserData();
    }
     */

    render(){
        return(
            <div id="main">
                <RepoColumn userName={this.state.userName}/>
                <MessagesBoard/>
                <Users onlineUsers={["guy","naor"]} offlineUsers={["keren"]}/>
            </div>
         )
    }

    async getUserData(){
        let response = await fetch('userData', {method:'POST', body: userName, credentials: 'include'});
    }
}