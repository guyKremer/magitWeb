import React from 'react';
import RepoList from '../RepoColumn/repoList/RepoLIst';

function UserRepositories(props){

    return(
        <RepoList repoChoosingHandler={()=>{}} repositories={props.userRepos}/>
    );
}
export default UserRepositories;