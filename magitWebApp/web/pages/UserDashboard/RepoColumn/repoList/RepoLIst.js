import React from 'react';
import Table from 'react-bootstrap/Table';

function RepoColumn(props){

    let reposArrayToRender = props.repositories.map((repo)=>{
        return(
        <tr>
            <td>{repo.repositoryName}</td>
            <td>{repo.activeBranch}</td>
            <td>{repo.amountOfBranches}</td>
            <td>{repo.lastCommitDate}</td>
\            <td>{repo.lastCommitMsg}</td>
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