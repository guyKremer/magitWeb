import React from 'react';
import RepoList from './repoList/RepoLIst';
import NewRepo from './newRepo/NewRepo';
import './repoColumn.css';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export default class RepoColumn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            newRepoPressed:false
        }
        this.newRepoEventHandler=this.newRepoEventHandler.bind(this);
    }

    newRepoEventHandler(){
        this.setState(()=>({
            newRepoPressed:true
        }));
    }


    render(){
        if(this.state.newRepoPressed === false){
            return(
                <div id="userDash-left">
                    <div id="userDash-left-first">
                        <div>Repositories</div>
                        <NewRepo onClick={this.newRepoEventHandler}/>
                    </div>
                    <RepoList forkOption={false} repoChoosingHandler={this.props.repoChoosingHandler} repositories={this.props.repositories}/>
                </div>
            );
        }
        else {
            return(
                <div id="userDash-left">
                    <div id="userDash-left-first">
                        <div>Repositories</div>
                        <input type="file" id="input" onChange={
                            async ()=>{
                                let input = document.getElementById('input');
                                let formData = new FormData();
                                formData.append("input",input.files[0]);
                                let newResponse = await fetch("repositories?userName="+this.props.userName, {method:'POST', body:formData,credentials: 'include'});
                                if(!newResponse.ok){
                                   newResponse=await newResponse.json();
                                    alert(newResponse);
                                }
                                this.setState(()=>({newRepoPressed:false}));
                            }}/>
                    </div>
                    <RepoList repositories={this.props.repositories}/>
                </div>
            );
        }

    }
}
