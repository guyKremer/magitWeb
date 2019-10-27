import React from 'react';
import Button from 'react-bootstrap/Button';
import './commits.css';

function Commits(props){

    let commmits = props.commits.map((commit)=>{
        let pointedBranches = commit.pointedBranches.map((branchName)=>{
            return(<p>{branchName}</p>);
        })
        return (
            <div className={singleCommit}>
                <Button variant={"link"}>{commit.sha1}</Button>
                <p>{commit.message}</p>
                <p>{commit.date}</p>
                <p>{commit.creator}</p>
                <p>{commit.pointedBranches}</p>
            </div>
        );
    });
    return(
        <div className={"commits"}>
            <b>Commits</b>
            {commmits}
        </div>
    )
}
export default Commits;