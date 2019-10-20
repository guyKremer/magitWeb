import React from 'react';
import UserDropdown from './userDropdown/UserDropdown';
import RepoList from './repoList/RepoLIst';
import Button from 'react-bootstrap/Button';

function RepoColumn (props){
    return(
            <React.Fragment>
                <div id="">
                <UserDropdown userName={props.userName}/>
                <RepoList/>
                <Button variant="success" >New</Button>
            </React.Fragment>
        );
}
export default RepoColumn;