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
            headBranch:{
                name:"test",
                commits:[]
            },
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
                    headBranch={this.state.headBranch}  regularBranchesNames={this.state.regularBranchesNames} isLR={this.state.type === "LR" ? true:false}
                />
                <Center/>
                <Commits commits={this.state.commits}/>
            </div>
        );
    }

   async getBranches(){
        let branchesResponse = await fetch('branches?repository='+this.props.repoName, {method:'GET', credentials: 'include'});
        branchesResponse= await branchesResponse.json();
        this.setState(()=>({
            headBranch : {name:branchesResponse.pop()},
            regularBranchesNames: branchesResponse}));
    }

    async getCommitsSha1(){
        let commitsResponse = await fetch('commits?repository='+this.props.repoName+'&branch='+this.state.headBranch.name, {method:'GET', credentials: 'include'});
        commitsResponse= await commitsResponse.json();
        this.setState(()=>({
            commits: commitsResponse}));
    }
}
