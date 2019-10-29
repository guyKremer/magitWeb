import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Branches from './branches/Branches';
import Button from 'react-bootstrap/Button';
import NewBranchButton from './NewBranchButton/NewBranchButton';
import './header.css';


function Header(props){

    return(
            <div className={"header"}>
                <div className={"row"}>
                    <Button variant={"success"} size={"sm"}>Back</Button>
                        <b>{"Repository: "+props.repoName}</b>
                    { props.isLR===true ?
                       <React.Fragment>
                           <div className={"RRrepoName"}>
                               <b>{"Remote Repository: "+props.RRuser + '/' + props.RRname}</b>
                           </div>
                       </React.Fragment>:""
                    }
                </div>
                <div className={"row"}>
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