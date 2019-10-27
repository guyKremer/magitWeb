import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Branches from './branches/Branches';
import Button from 'react-bootstrap/Button';
import './header.css';


function Header(props){

    return(
            <div className={"header"}>
                <div className={"row"}>
                    <Button variant={"success"}>Back</Button>
                    <b>{props.repoName}</b>
                    <br></br>
                </div>
                <div className={"row"}>
                    <Branches checkOut={props.checkOut} headBranchName={props.headBranchName} headBranch={props.headBranch} regularBranchesNames={props.regularBranchesNames}/>
                    <Button variant={"success"} id={"pr"}  className={props.isLR === false ? "hide":""} onClick={props.pullOnClick} size={"sm"}>New Pull Request</Button>
                    <Button onClick={props.pullOnClick} variant={"success"} id={"pull"} className={props.isLR === false ? "hide":""} onClick={props.pullOnClick} size={"sm"}>Pull</Button>
                    <Button  onClick={props.pushOnClick} variant={"success"} id={"push"} className={props.isLR === false ? "hide":""}  onClick={props.pullOnClick} size={"sm"}>Push</Button>
                </div>

            </div>
    )
}
export default Header