import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PullRequestForm from './PullRequestForm';
import './pullRequestButton.css';


export default class PullRequestButton extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            showForm: false,
            Rbs:[],
            Rtbs:[]
        }
        this.onClick=this.onClick.bind(this);
    }

   async onClick(){
        let Rtbs;
        let Rbs;
        let showForm=this.state.showForm === false? true:false;

        if(showForm){
             Rtbs = await fetch('PR?repository='+this.props.repoName+ '&type=RTB', {method:'PUT',body:'', credentials: 'include'});
             Rbs = await fetch('PR?repository='+this.props.repoName+ '&type=RB', {method:'PUT',body:'', credentials: 'include'});
        }
        this.setState(()=>({
            showForm: showForm
            Rbs:Rbs,
            Rtbs:Rtbs
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