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
            headBranch:null,
            regularBranchesNames:[]
        }
    }

    render() {
        return(
            <div className={"singleRepository"}>
                <Header
                    isLR={this.state.type === "LR" ? true:false}
                />
            </div>
        );
    }
}
