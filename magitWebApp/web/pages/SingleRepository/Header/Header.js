import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Branches from './branches/Branches';
import Button from 'react-bootstrap/Button';
import NewBranchButton from './NewBranchButton/NewBranchButton';
import './header.css';


function Header(props){

    return(
            <div className={"header"}>
                <div className={"row1"}>
                    <Button variant={"success"}>Back</Button>
                    { props.isLR===true ?
                        <div className={"row2"}>
                            <b>{props.repoName}</b>
                            <div className={"right"}>
                                <b> RR: </b>
                                <b>{props.RRuser + '/' + props.RRname}</b>
                            </div>
                        </div>:""
                    }
                </div>
                <div className={"row2"}>
                    <Branches checkOut={props.checkOut} headBranchName={props.headBranchName} regularBranchesNames={props.regularBranchesNames}/>
                    <NewBranchButton repoName={props.repoName}/>
                    <Button variant={"success"} id={"pr"}  className={props.isLR === false ? "hide":""} onClick={props.pullOnClick} size={"sm"}>Create Pull Request</Button>
                    <Button onClick={props.pullOnClick} variant={"success"} id={"pull"} className={props.isLR === false ? "hide":""} onClick={props.pullOnClick} size={"sm"}>Pull</Button>
                    <Button  onClick={props.pushOnClick} variant={"success"} id={"push"} className={props.isLR === false ? "hide":""}  onClick={props.pushOnClick} size={"sm"}>Push</Button>
                </div>
            </div>
    )
}
export default Header