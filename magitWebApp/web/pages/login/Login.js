import React from 'react';
import './login.css';

class SignUp extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            errMessage: ""
        };
        this.handleLogin=this.handleLogin.bind(this);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleLogin}  className= "form">
                    <label className ="login-text"> Login </label>
                    <input name="userName"/>
                    <input type="submit" value="Login" className= "btn-login"/>
                    <label className = "error-message">{this.state.errMessage}</label>
                </form>
            </div>
        );
    }

    async handleLogin(e) {
        e.preventDefault();
        const userName = e.target.elements.userName.value;
        let response = await fetch('login', {method:'POST', body: userName, credentials: 'include'});

        if(response.ok){
            let name = await response.json();
            this.setState(()=> ({errMessage: "llcome "+ name}));
        }
        else{
            this.setState(()=> ({errMessage: "Please insert name"}));
        }
    }
}

export default SignUp;
