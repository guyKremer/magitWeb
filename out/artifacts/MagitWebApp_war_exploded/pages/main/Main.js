import React from 'react';

export default class Main extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            userName:this.props.userName,
            messeages:null,
            repos:null
        };
    }

    render() {
        return(
        <div className="flex-container">
            <div>{this.state.userName}</div>
            <div>{this.state.userName}</div>
            <div>{this.state.userName}</div>
        </div>
        )
    }
}