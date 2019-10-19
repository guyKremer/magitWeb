import React from 'react';

export default class Main extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            userName:this.props.userName,
            messeages:null,
            repos:null
        };
        this.getUserData=this.getUserData.bind(this);
    }

    componentDidMount() {
        this.getUserData();
    }
    }

    render() {
        return(
        <div id="main">
            <Left userName={this.state.userName}>
            <div>{}</div>
        </div>
        )
    }

    async getUserData(){
        let response = await fetch('userData', {method:'POST', body: userName, credentials: 'include'});

    }
}