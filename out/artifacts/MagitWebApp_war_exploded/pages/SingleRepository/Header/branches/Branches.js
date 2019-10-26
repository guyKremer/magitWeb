import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function Branches(props){
    let regularBranchesNames=props.regularBranchesNames.map((branchName)=>{
        <Dropdown.Item>{branchName}</Dropdown.Item>
    });

    return(
        <Dropdown>
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                {props.headBranch.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {regularBranchesNames}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Branches;