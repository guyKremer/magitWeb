import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function Branches(props){
    let regularBranchesNames=props.regularBranchesNames.map((branchName,index)=>{
        return(<Dropdown.Item key={"branches"+branchName+index} onClick={()=>{props.checkOut(branchName)}}>{branchName}</Dropdown.Item>);
    });


    return(
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size={"sm"}>
                {props.headBranchName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {regularBranchesNames}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Branches;