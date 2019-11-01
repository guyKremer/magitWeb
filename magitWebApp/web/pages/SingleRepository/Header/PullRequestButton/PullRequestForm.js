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
        let Rtbs = this.props.Rtbs.map((rtb)=>{
            return(<option>{rtb}</option>)
        });
        let Rbs = this.props.Rbs.map((rb)=>{
            return(<option>{rb}</option>)
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
        /*
        return(
            <div class="form-style-2">
                <div class="form-style-2-heading">Branch Details</div>
                <label for="field1"><span>Target branch</span><input type="text" class="input-field" id={"targetBranchInput"} name="field1"/></label>
                <label htmlFor="field1"><span>Base branch</span><input type="text" className="input-field" id={"baseBranchInput"} name="field1"/></label>
                <label htmlFor="field1"><span>Message</span><input type="text" className="input-field" id={"prMessageInput"} name="field1"/></label>
                <Button variant={"success"} onClick={this.onClickSubmit} size={"sm"}>Submit</Button>
            </div>
        );
         */
    }


    onClickSubmit(){
        let targetBranchName=document.getElementById("targetBranchInput").value;
        let baseBranchName = document.getElementById("baseBranchInput").value;
        let prMessage = document.getElementById("prMessageInput").value;

        
        fetch('PR?repository='+this.props.RRname+ '&remoteUser='+this.props.RRuser+'&baseBranch='+baseBranchName+'&targetBranch='+targetBranchName +'&msg='+prMessage, {method:'POST',body:'', credentials: 'include'});
    }

}