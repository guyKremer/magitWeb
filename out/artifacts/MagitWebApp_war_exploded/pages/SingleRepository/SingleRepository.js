import React from 'react';
import Header from './Header/Header';
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
            regularBranchesNames:[]
        }
    }

    componentDidMount() {

    }

    render() {
        return(
            <div className={"singleRepository"}>
                <Header
                    headBranch={this.state.headBranch}  regularBranchesNames={this.state.regularBranchesNames} isLR={this.state.type === "LR" ? true:false}
                />
            </div>
        );
    }

   async getBranches(){
        let branchesResponse = await fetch('branches?repository='+props.repoName, {method:'GET', credentials: 'include'});
        branchesResponse= await branchesResponse.json();
        this.setState(()=>({
            headBranch : {name:branchesResponse.pop()},
            regularBranchesNames: branchesResponse
        }));
    }
}
