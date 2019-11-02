import React from 'react';
import RepoList from '../RepoColumn/repoList/RepoLIst';
import Button from 'react-bootstrap/Button';
import './userRepositories.css';

function UserRepositories(props){

    const onclick = (RRRepoName, LRnewRepoName) => {
        props.forkOnClick();
        let check = 'collaboration?remoteUser='+props.userName+'&remoteRepo='+RRRepoName+'&localRepo='+LRnewRepoName;
        let repoResponse =  fetch(check, {method:'POST',body:'', credentials: 'include'});
    }
    return(
        <React.Fragment>
            <Button variant={"success"} onClick={props.backOnclick}>Back</Button>
            <div className={"userRepos"}>
                <RepoList forkOnClick={onclick} forkOption={true} repoChoosingHandler={()=>{}} repositories={props.userRepos}/>
            </div>
        </React.Fragment>
    );
}
export default UserRepositories;