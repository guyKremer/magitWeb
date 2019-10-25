import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Branches from './branches/Branches';
import Button from 'react-bootstrap/Button';
import './header.css';


function Header(props){

    return(
            <div className={"header"}>
                <Branches headBranchName={props.headBranchName} regularBranchesNames={props.regularBranchesNames}/>
                <Button id={"pr"}  className={props.isLR === false ? "hide":""} onClick={props.pullOnClick} size={"sm"}>New Pull Request</Button>
                <Button id={"pull"} className={props.isLR === false ? "hide":""} onClick={props.pullOnClick} size={"sm"}>Pull</Button>
                <Button id={"push"} className={props.isLR === false ? "hide":""}  onClick={props.pullOnClick} size={"sm"}>Push</Button>
            </div>
    )
}
export default Header