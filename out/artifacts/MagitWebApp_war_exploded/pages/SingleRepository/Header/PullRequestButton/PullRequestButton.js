import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PullRequestForm from './PullRequestForm';
import './pullRequestButton.css';


export default class PullRequestButton extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            showForm: false
        }
        this.onClick=this.onClick.bind(this);
    }

    onClick(){
        let showForm=this.state.showForm === false? true:false;
        this.setState(()=>({
            showForm: showForm
        }));
    }

    render() {
        return (
            <div className={"newBranch"}>
                <Dropdown.Toggle onClick={this.onClick} variant={"success"} id="dropdown-basic" size={"sm"}>
                    Create New Pull Request
                </Dropdown.Toggle>
                {this.state.showForm ? <PullRequestForm  closeForm={this.onClick} repoName={this.props.repoName} location={this.state.location}/>:""}
            </div>
        );
    }
}