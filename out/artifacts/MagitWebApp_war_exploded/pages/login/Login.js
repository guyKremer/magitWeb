import React from 'react';
import './login.css';

export default class SignUp extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            errMessage: "",
        };
    }

    async componentDidMount() {
        let response = await fetch('login', {method:'GET', credentials: 'include'});
        if(response.ok){
            response = await response.json();
            this.props.handleLogin(response.userName);
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={this.loginActionEventHandler.bind(this)}  className= "form">
                    <label className ="login-text"> Login </label>
                        <input name="userName"/>
                        <input type="submit" value="Login" className= "btn-login"/>
                        <label className = "error-message">{this.state.errMessage}</label>
                    </form>
                </div>
            );
        }


     async loginActionEventHandler(e) {
        e.preventDefault();
        const userName = e.target.elements.userName.value;
        console.log(userName);
        if(userName !==""){
            let response = await fetch('login', {method:'POST', body: userName, credentials: 'include'});

            if(response.ok){
                let name = await response.json();
                name = name.userName;
                this.props.handleLogin(name);
            }
            else{
                let errorMsg = await response.json()
                this.setState(()=> ({errMessage: errorMsg}));
            }
        }
        else{
            alert("Empty name is not allowed");
        }

    }
}
