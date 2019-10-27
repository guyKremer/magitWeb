import React from 'react';
import RepoList from '../RepoColumn/repoList/RepoLIst';
import './userRepositories.css';

function UserRepositories(props){

    const onclick = (RRRepoName, LRnewRepoName) => {
        props.forkOnClick();
        let check = 'collaboration?remoteUser='+props.userName+'&remoteRepo='+RRRepoName+'&localRepo='+LRnewRepoName;
        let repoResponse =  fetch(check, {method:'POST',body:'', credentials: 'include'});
    }
    return(
        <div className={"userRepos"}>
            <RepoList forkOnClick={onclick} forkOption={true} repoChoosingHandler={()=>{}} repositories={props.userRepos}/>
        </div>
    );
}
export default UserRepositories;