import React from 'react';
import Header from './Header/Header';
import Center from './Center/Center';
import Commits from './Center/Commits/Commits';
import MessageBoard from '../UserDashboard/MessagesBoard/MessagesBoard';

import './singleRepository.css';

export default class SingleRepository extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            type:"LR",
            remoteRepo:null,
            headBranch:"test",
            regularBranchesNames:[],
            commits:[],
            fileTree:{
                type:"folder",
                folderContent:
                [
                    {
                     type:"folder",
                     name:"folderTest"
                    },
                    {
                        type:"file",
                        name:"fileTest"
                    },
                ]
            }
        }
        this.getBranches=this.getBranches.bind(this);
        this.getCommitsSha1=this.getCommitsSha1.bind(this);
        this.pullOnClickHandler=this.pullOnClickHandler.bind(this);
        this.pushOnClickHandler=this.pushOnClickHandler.bind(this);
        this.chekoutHandler=this.chekoutHandler.bind(this);


    }

    componentDidMount() {
        this.getBranches();
        this.getCommitsSha1();
        setInterval(async ()=>{
            this.getBranches();
            this.getCommitsSha1();
        }, 2000);
    }


    render() {
        return(
            <div className={"singleRepository"}>
                <Header
                   pullOnClick={this.pullOnClickHandler} pushOnClick={this.pushOnClickHandler} checkOut={this.chekoutHandler} headBranch={this.state.headBranch} regularBranchesNames={this.state.regularBranchesNames} isLR={this.state.type === "LR" ? true:false}
                />
                <Center/>
                <Commits commits={this.state.commits}/>
            </div>
        );
    }


    async chekoutHandler(newHeadBranch){
        await fetch('branches?repository='+this.props.repoName+'&branch='+newHeadBranch, {method:'POST', credentials: 'include'});
        let regularBranchesName = this.state.regularBranchesNames.filter((branchName)=>{
            return branchName!==newHeadBranch;
        });
        this.setState(()=>({
            headBranch : newHeadBranch,
            regularBranchesNames: regularBranchesName}));
    }

    pushOnClickHandler(){
        fetch('collaboration?repository='+this.props.repoName+'&operation=push', {method:'GET', credentials: 'include'});
    }
   async pullOnClickHandler(){
        await fetch('collaboration?repository='+this.props.repoName+'&operation=pull', {method:'GET', credentials: 'include'});
       this.getBranches();
       this.getCommitsSha1();
   }

   async getBranches(){
        let branchesResponse = await fetch('branches?repository='+this.props.repoName, {method:'GET', credentials: 'include'});
        branchesResponse= await branchesResponse.json();
        this.setState(()=>({
            headBranch : {name:branchesResponse.shift()},
            regularBranchesNames: branchesResponse}));
    }

    async getCommitsSha1(){
        let commitsResponse = await fetch('commits?repository='+this.props.repoName+'&branch='+this.state.headBranch.name, {method:'GET', credentials: 'include'});
        commitsResponse= await commitsResponse.json();
        this.setState(()=>({
            commits: commitsResponse}));
    }


}
