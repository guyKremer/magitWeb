import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Branches from './branches/Branches';
import Button from 'react-bootstrap/Button';
import NewBranchButton from './NewBranchButton/NewBranchButton';
import PullRequestButton from './PullRequestButton/PullRequestButton';
import './header.css';


function Header(props){

    return(
            <div className={"header"}>
                <div className={"row"}>
                    <Button onClick={props.backOnClick} variant={"success"} size={"sm"}>Back</Button>
                        <b>{"Repository: "+props.repoName}</b>
                    { props.isLR===true ?
                       <React.Fragment>
                           <div className={"RRrepoName"}>
                               <b>{"Remote Repository: "+props.RRuser + '/' + props.RRname}</b>
                           </div>
                       </React.Fragment>:
                        <Button variant={"secondary"} size={"sm"} id={"viewPrs"} onClick={props.showPRsOnClick}>Pull Requests</Button>
                    }
                </div>
                <div className={"row"}>
                    <Branches checkOut={props.checkOut} headBranchName={props.headBranchName} regularBranchesNames={props.regularBranchesNames}/>
                    <PullRequestButton RRuser={props.RRuser} RRname={props.RRname} repoName={props.repoName}/>
                    <Button className={"noHeightIncrease"} variant={"success"} id={"commit"} onClick={()=>{
                        let msg = window.prompt("Enter commit message");
                        if(msg!==null){
                            props.commitOnClick(msg);
                        }
                    }} size={"sm"}>
                        Commit</Button>
                    <NewBranchButton repoName={props.repoName}/>
                    <Button onClick={props.pullOnClick} variant={"success"} id={"pull"} className={ "noHeightIncrease" + props.isLR === false ? "hide":"" } onClick={props.pullOnClick} size={"sm"}>Pull</Button>
                    <Button  onClick={props.pushOnClick} variant={"success"} id={"push"} className={"noHeightIncrease" + props.isLR === false ? "hide":"" }  onClick={props.pushOnClick} size={"sm"}>Push</Button>
                </div>
            </div>
    )
}
export default Header