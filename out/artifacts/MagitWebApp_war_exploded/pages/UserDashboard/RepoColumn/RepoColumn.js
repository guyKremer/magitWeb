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

    componentDidMount() {
        setInterval(async ()=>{
            let response = await fetch("repositories", {method:'GET',credentials: 'include'});
            let parsedResponse = await response.json();
            console.log(parsedResponse);
        }, 3000);

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
                        <div>Repositories</div>
                        <input type="file" id="input" onChange={
                            ()=>{
                                let input = document.getElementById('input');
                                let formData = new FormData();
                                formData.append("input",input.files[0]);
                                fetch("repositories?userName="+this.props.userName, {method:'POST', body:formData,credentials: 'include'});
                                this.setState(()=>({newRepoPressed:false}));
                            }}/>
                    </div>
                    <RepoList/>
                </div>
            );
        }

    }
}
