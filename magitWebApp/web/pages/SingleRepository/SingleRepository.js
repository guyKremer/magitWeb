import React from 'react';
import Header from './Header/Header';
import Center from './Center/Center';
import Commits from './Center/Commits/Commits';
import MessageBoard from '../UserDashboard/MessagesBoard/MessagesBoard';
import PullRequests from './PullRequests/PullRequests';
import './singleRepository.css';

export default class SingleRepository extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:props.repoName,
            type:props.type,
            remoteRepo:null,
            headBranch:"",
            headBranchCommit:"",
            isHeadBranchCommit:true,
            regularBranchesNames:[],
            commits:[],
            fileTree:{
                type:"",
                name:"",
                content:[]
            },
            fileHierarchy:[props.repoName],
            fileEditor:false,
            chosenFileContent:"",
            chosenFileName:"",
            createNewFile:false,
            messages:[],
            showPr:false
        }
        this.getBranches=this.getBranches.bind(this);
        this.getCommitsSha1=this.getCommitsSha1.bind(this);
        this.pullOnClickHandler=this.pullOnClickHandler.bind(this);
        this.pushOnClickHandler=this.pushOnClickHandler.bind(this);
        this.chekoutHandler=this.chekoutHandler.bind(this);
        this.barButtonOnClickHandler=this.barButtonOnClickHandler.bind(this);
        this.itemOnClickHandler= this.itemOnClickHandler.bind(this);
        this.createNewFileOnClickHandler=this.createNewFileOnClickHandler.bind(this);
        this.editFileCancelOnClickHandler=this.editFileCancelOnClickHandler.bind(this);
        this.saveOnClickHandler=this.saveOnClickHandler.bind(this);
        this.getMessages=this.getMessages.bind(this);
        this.commitButtonOnClickHandler=this.commitButtonOnClickHandler.bind(this);
        this.commitSha1OnClickHandler=this.commitSha1OnClickHandler.bind(this);
        this.showPrsOnClickHandler=this.showPrsOnClickHandler.bind(this);
        this.pullRequestBackButtonOnClick=this.pullRequestBackButtonOnClick.bind(this);
    }

    async componentDidMount() {
        this.getMessages();
        this.getBranches();
        this.getCommitsSha1();
        setInterval(async ()=>{
            this.getBranches();
            this.getCommitsSha1();
            this.getMessages();
        }, 2000);
        await fetch('commits?repository='+this.state.name+'&sha1=0', {method:'POST', credentials: 'include'});
        let folder = await fetch('folderItem?folderItem='+this.state.name, {method:'GET', credentials: 'include'});
        folder = await folder.json();
        this.setState(()=>({
            fileTree: folder,
        }));
    }

   async getMessages(){
        let messagesRespone = await fetch('messages', {method:'GET', credentials: 'include'});
        messagesRespone = await messagesRespone.json();
        this.setState(()=>({
            messages: messagesRespone
        }));
    }


    render() {
        if(!this.state.showPr){
            return(
                <div className={"singleRepository"}>
                    <Header
                        showPRsOnClick={this.showPrsOnClickHandler} commitOnClick={this.commitButtonOnClickHandler} backOnClick={this.props.backOnClick} repoName={this.state.name} pullOnClick={this.pullOnClickHandler} pushOnClick={this.pushOnClickHandler} checkOut={this.chekoutHandler} headBranchName={this.state.headBranch} regularBranchesNames={this.state.regularBranchesNames} RRname={this.props.RRname} RRuser={this.props.RRuser} isLR={this.state.type === "LR" ? true:false}
                    />
                    <Center  isHeadBranchCommit={this.state.isHeadBranchCommit} messages={this.state.messages} saveOnClickHandler={this.saveOnClickHandler} editFileCancelOnClickHandler={this.editFileCancelOnClickHandler} createNewFile={this.state.createNewFile} createNewFileOnClick={this.createNewFileOnClickHandler}  chosenFileContent={this.state.chosenFileContent} fileEditor={this.state.fileEditor} itemOnClick={this.itemOnClickHandler} barButtonOnClick={this.barButtonOnClickHandler} fileHierarchy={this.state.fileHierarchy} fileTree={this.state.fileTree}/>
                    <Commits commitSha1OnClick={this.commitSha1OnClickHandler} commits={this.state.commits}/>
                </div>
            );
        }
        else{
            return(
                <PullRequests pullRequestBackButtonOnClick={this.pullRequestBackButtonOnClick} repository={this.state.name}/>
            );
        }

    }

    showPrsOnClickHandler(){
        this.setState(()=>({
            showPr:true
        }));
    }

    pullRequestBackButtonOnClick(){
        this.setState(()=>({
            showPr:false
        }));
    }

    async commitSha1OnClickHandler(sha1){
        await fetch('commits?repository='+this.state.name+'&sha1='+sha1, {method:'POST', credentials: 'include'});
        let lastFolder = this.state.fileHierarchy[this.state.fileHierarchy.length-1];
        let folder = await fetch('folderItem?folderItem='+this.state.name, {method:'GET', credentials: 'include'});
        folder= await folder.json();
        this.setState(()=>({
            fileTree: folder,
            fileHierarchy:[this.state.name],
            fileEditor: false,
            createNewFile:false,
            chosenFileName:"",
            isHeadBranchCommit:this.state.headBranchCommit===sha1 ? true:false
        }));
    }

    createPullRequestOnClickHandler(){
        window.prompt()
    }

    async commitButtonOnClickHandler(msg){
        if(msg===""){
            window.alert("You have to enter a message to the commit");
        }
        else{
            let commitResponse=await fetch('WC?commitMsg='+msg+'&repository='+this.state.name, {method:'PUT',body:'', credentials: 'include'});
        }
    }

    createNewFileOnClickHandler(){
        this.setState(()=>({
            createNewFile:true,
            fileEditor: true
        }));
    }

    async saveOnClickHandler(fileName,fileContent){
        let reqBody;
        if(fileName!=="---"){
             reqBody = {
                tree:this.state.fileHierarchy,
                fileName:fileName,
                content: fileContent
            }
            await fetch('WC', {method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(reqBody), credentials: 'include'});
        }
        else{
            reqBody = {
                tree:this.state.fileHierarchy,
                fileName:this.state.chosenFileName,
                content: fileContent
            }
            await fetch('WC', {method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(reqBody), credentials: 'include'});
        }
        await fetch('commits?repository='+this.state.name+'&sha1=0', {method:'POST', credentials: 'include'});
        let lastFolder = this.state.fileHierarchy[this.state.fileHierarchy.length-1];
        let folder = await fetch('folderItem?folderItem='+lastFolder, {method:'GET', credentials: 'include'});
        folder= await folder.json();
        this.setState(()=>({
            fileTree: folder,
            fileEditor: false,
            createNewFile:false,
            chosenFileName:""
        }));
    }

    editFileCancelOnClickHandler(){
        this.setState(()=>({
            createNewFile:false,
            fileEditor: false,
            chosenFileName:""
        }));
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
                chosenFileName:name,
                fileEditor:true
            }));
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
             fileHierarchy = this.state.fileHierarchy.filter((file)=>{
                 let res = i<=index;
                 i++;
                 return res;
            });
        }
        console.log(fileHierarchy);
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
        fetch('collaboration?repository='+this.props.repoName+'&operation=push&remoteUser='+this.props.RRuser, {method:'GET', credentials: 'include'});
    }
   async pullOnClickHandler(){
        await fetch('collaboration?repository='+this.props.repoName+'&operation=pull&remoteUser='+this.props.RRuser, {method:'GET', credentials: 'include'});
       await fetch('commits?repository='+this.state.name+'&sha1=0', {method:'POST', credentials: 'include'});
       let folder = await fetch('folderItem?folderItem='+this.props.repoName, {method:'GET', credentials: 'include'});
       folder = await folder.json();
       this.setState(()=>({
           fileHierarchy:[this.state.name],
           fileTree: folder}));
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
            commits: commitsResponse,
            headBranchCommit:commitsResponse.length!==0 ? commitsResponse[0].sha1:""
        }));
    }
}
