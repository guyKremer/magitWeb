import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './pullRequestform.css';


export default class PullRequestForm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            sha1:false,
        }
        this.onClickSubmit=this.onClickSubmit.bind(this);
    }

    render() {
        let Rtbs = this.props.Rtbs.map((rtb,index)=>{
            return(<option key={"RTB"+rtb+index}>{rtb}</option>)
        });
        let Rbs = this.props.Rbs.map((rb,index)=>{
            return(<option key={"RB"+rb+index}>{rb}</option>)
        });
    return(
        <Form>
            <Form.Group controlId="targetBranchInput">
                <Form.Label>Target branch</Form.Label>
                <Form.Control as="select">
                    {Rtbs}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="baseBranchInput">
                <Form.Label>Base branch</Form.Label>
                <Form.Control as="select">
                    {Rbs}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="prMessageInput">
                <Form.Label>PR message</Form.Label>
                    <Form.Control type="text"/>
            </Form.Group>
            <Button variant="success" onClick={this.onClickSubmit} size={"sm"}>
                Submit
            </Button>
        </Form>
    );

    }


    async onClickSubmit(){
        let targetBranchName=document.getElementById("targetBranchInput").value;
        let baseBranchName = document.getElementById("baseBranchInput").value;
        let prMessage = document.getElementById("prMessageInput").value;

        baseBranchName = baseBranchName.split('\\');
        baseBranchName = baseBranchName[1];

        this.props.closeForm();

       let response =  await fetch('PR?repository='+this.props.RRname+ '&remoteUser='+this.props.RRuser+'&baseBranch='+baseBranchName+'&targetBranch='+targetBranchName +'&msg='+prMessage, {method:'POST',body:'', credentials: 'include'});
       if(response.ok){
           alert("Pull Request created successfully");
       }
       else{
           alert("Something went wrong please try again");
       }
    }

}