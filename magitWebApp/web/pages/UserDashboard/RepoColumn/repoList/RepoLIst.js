import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function RepoColumn(props){

    let reposArrayToRender = props.repositories.map((repo,index)=>{
        return(
        <tr key={"repoList"+repo.repositoryName+index} onClick={()=>{props.repoChoosingHandler(repo.repositoryName,repo.type,repo.RRname,repo.RRuser);}}>
            <td >{repo.repositoryName}</td>
            <td>{repo.activeBranch}</td>
            <td>{repo.amountOfBranches}</td>
            <td>{repo.lastCommitDate}</td>
            <td>{repo.lastCommitMsg}</td>
            {props.forkOption===true?
                 <Button variant={"success"} onClick={()=>{
                     let repoName = window.prompt("Enter repo name");
                     if(repoName!==null) {
                         props.forkOnClick(repo.repositoryName,repoName)
                     }
                 }} size={"sm"}>Fork</Button>:""
            }
        </tr>
        );
    });
        return(
            <Table hover>
                <tbody>
                {reposArrayToRender}
                </tbody>
            </Table>
        );
}
export default RepoColumn;