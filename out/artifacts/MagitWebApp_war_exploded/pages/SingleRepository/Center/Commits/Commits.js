import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './commits.css';

function Commits(props){

    let commmits = props.commits.map((commit,index)=>{
        return (
            <tr key={commit.sha1+index}>
                <td>
                    <Button onClick={()=>{props.commitSha1OnClick(commit.sha1)}} variant={"link"}>{commit.sha1}</Button>
                </td>
                <td>{commit.message}</td>
                <td>{commit.date}</td>
                <td>{commit.creator}</td>
                <td>{commit.pointedBranches}</td>
            </tr>
        );
    });
    return(
        <div className={"commits"}>
            <b>Commits</b>
            <Table >
                <thead>
                <tr>
                    <th>Sha1</th>
                    <th>Message</th>
                    <th>Date of creation</th>
                    <th>Creator</th>
                    <th>Pointed by </th>
                </tr>
                </thead>
                <tbody>
                {commmits}
                </tbody>
            </Table>
        </div>
    )
}
export default Commits;