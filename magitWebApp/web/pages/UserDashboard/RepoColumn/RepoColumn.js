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
        this.render=this.render.bind(this);
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
                    <RepoList/>
                </div>
            );
        }
        else {
            return(
                <div id="userDash-left">
                    <div id="userDash-left-first">
                        <input type="file" id="input" onChange={
                            ()=>{
                                let selectedFile = document.getElementById('input');
                                let  formData = new FormData();
                                formData.append("file",selectedFile);
                                fetch("repositories?userName="+this.props.userName, {method:'POST', body: formData,credentials: 'include'});
                            }}/>
                    </div>
                    <RepoList/>
                </div>
            );
        }

    }
}
