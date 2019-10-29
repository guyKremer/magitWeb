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
            name:props.repoName,
            type:props.type,
            remoteRepo:null,
            headBranch:"",
            regularBranchesNames:[],
            commits:[],
            fileTree:{
                type:"",
                name:"",
                content:[]
            },
            fileHierarchy:[props.repoName],
            fileEditor:false,
            chosenFileContent:""
        }
        this.getBranches=this.getBranches.bind(this);
        this.getCommitsSha1=this.getCommitsSha1.bind(this);
        this.pullOnClickHandler=this.pullOnClickHandler.bind(this);
        this.pushOnClickHandler=this.pushOnClickHandler.bind(this);
        this.chekoutHandler=this.chekoutHandler.bind(this);
        this.barButtonOnClickHandler=this.barButtonOnClickHandler.bind(this);
        this.itemOnClickHandler= this.itemOnClickHandler.bind(this);
    }

    async componentDidMount() {
        this.getBranches();
        this.getCommitsSha1();
        setInterval(async ()=>{
            this.getBranches();
            this.getCommitsSha1();
        }, 2000);
        await fetch('commits?repository='+this.state.name+'&sha1=0', {method:'POST', credentials: 'include'});
        let folder = await fetch('folderItem?folderItem='+this.state.name, {method:'GET', credentials: 'include'});
        folder = await folder.json();
        this.setState(()=>({
            fileTree: folder,
        }));
    }


    render() {
            return(
                <div className={"singleRepository"}>
                    <Header
                        repoName={this.state.name} pullOnClick={this.pullOnClickHandler} pushOnClick={this.pushOnClickHandler} checkOut={this.chekoutHandler} headBranchName={this.state.headBranch} regularBranchesNames={this.state.regularBranchesNames} RRname={this.props.RRname} RRuser={this.props.RRuser} isLR={this.state.type === "LR" ? true:false}
                    />
                    <Center chosenFileContent={this.state.chosenFileContent} fileEditor={this.state.fileEditor} itemOnClick={this.itemOnClickHandler} barButtonOnClick={this.barButtonOnClickHandler} fileHierarchy={this.state.fileHierarchy} fileTree={this.state.fileTree}/>
                    <Commits commits={this.state.commits}/>
                </div>
            );

    }

    async itemOnClickHandler(name,content,type){
        if(type==="folder"){
            let folder = await fetch('folderItem?folderItem='+name, {method:'GET', credentials: 'include'});
            folder = await folder.json();
            let fileHierarchy = this.state.fileHierarchy;
            fileHierarchy.push(name);
            this.setState(()=>({
                fileTree: folder,
                fileHierarchy:fileHierarchy
            }));
        }
        else{
            this.setState(()=>({
                chosenFileContent:content,
                fileEditor:true
            }))
        }
    }

    async barButtonOnClickHandler(folderName,index){
        let folder = await fetch('folderItem?folderItem='+folderName, {method:'GET', credentials: 'include'});
        folder = await folder.json();
        let fileHierarchy;
        let i=0;
        if(index === 0){
            fileHierarchy=[this.state.name];
        }
        else{
             fileHierarchy = this.state.fileHierarchy.map((file)=>{
                if(i<=index){
                    console.log(file);
                    i++
                    return file;
                }
            });
        }
        this.setState(()=>({
            fileTree: folder,
            fileHierarchy:fileHierarchy
        }));
    }

    async chekoutHandler(newHeadBranch){
        newHeadBranch = newHeadBranch.replace('\\','^');
        newHeadBranch = newHeadBranch.replace(" ",'^^');

        await fetch('branches?repository='+this.state.name, {method:'POST',body:newHeadBranch, credentials: 'include'});
        let regularBranchesName = this.state.regularBranchesNames.filter((branchName)=>{
            return branchName!==newHeadBranch;
        });
        await fetch('commits?repository='+this.state.name+'&sha1=0', {method:'POST', credentials: 'include'});
        let folder = await fetch('folderItem?folderItem='+this.props.repoName, {method:'GET', credentials: 'include'});
         folder = await folder.json();

        this.setState(()=>({
            fileHierarchy:[this.state.name],
            fileTree: folder,
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
        branchesResponse= await branchesResponse.json()
        let newHeadBranch=branchesResponse.shift();
        this.setState(()=>({
            headBranch: newHeadBranch,
            regularBranchesNames: branchesResponse}));
    }

    async getCommitsSha1(){
        let commitsResponse = await fetch('commits?repository='+this.props.repoName+'&branch='+this.state.headBranch, {method:'GET', credentials: 'include'});
        commitsResponse= await commitsResponse.json();
        this.setState(()=>({
            commits: commitsResponse}));
    }


}
