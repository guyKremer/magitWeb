import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import './newBranchForm.css';


export default class NewBranchForm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            sha1:false
        }

        this.onClickCheckBox=this.onClickCheckBox.bind(this);
        this.onClickSubmit=this.onClickSubmit.bind(this);
    }

    render() {
        return(
            <div className="form-style-2">
                <div className="form-style-2-heading">Branch Details</div>
                <label htmlFor="field1"><span>Name</span><input type="text" className="input-field" id={"branchNameInput"} name="field1"  /></label>
                <label htmlFor="field1"><span>Enter Sha1</span></label>
                <input type="checkbox" id="myCheck" onClick={this.onClickCheckBox}/>
                {this.state.sha1===true ? <label htmlFor="field1"><span>Enter Sha1</span><input type="text" className="input-field" id={"sha1Input"} name="field1"  /></label>:""}
                <Button variant={"success"} onClick={this.onClickSubmit} size={"sm"}>Submit</Button>
            </div>
        );
    }

    onClickCheckBox(){
            this.setState(()=>({
                sha1:this.state.sha1? false:true
            }));
    }

    onClickSubmit(){
        let branchName=document.getElementById("branchNameInput").value;
        let sha1=""
        if(this.state.sha1){
             sha1 = document.getElementById("sha1Input").value;
        }

        if(branchName===""){
            window.alert("Branch name is mendatory");
        }
        else{
            fetch('branches?repository='+this.props.repoName+ '&branch='+branchName+'&sha1='+sha1, {method:'PUT',body:'', credentials: 'include'});
            this.props.closeForm();
        }
    }

}