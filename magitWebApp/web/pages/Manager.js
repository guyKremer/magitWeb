import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login/Login';
import Consts from'./Constants';
import Main from './UserDashboard/UserDashboard';

import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class BaseContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            location:props.location,
            userName:null
        }
        this.loginHandler = this.loginHandler.bind(this);
    }

    render() {

        if(this.state.location === Consts.LOGIN){
            return(
                <React.Fragment>
                    <Login handleLogin={this.loginHandler}/>)
                </React.Fragment>);
        }
        else if(this.state.location === Consts.MAIN) {
            return(
                <Router>
                    <Route key={"a"} path='/' exact>
                        <Main userName={this.state.userName}/>
                    </Route>

                    <Route key={"b"} path='/repositories' >
                        <Main userName={this.state.userName}/>
                    </Route>

                </Router>
            );
        }
    }

    loginHandler(userName){
        this.setState(()=> ({
            location: Consts.MAIN,
            userName:userName
        }));
    }
}