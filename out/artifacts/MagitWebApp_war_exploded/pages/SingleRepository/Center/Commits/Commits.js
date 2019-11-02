import React from 'react';
import Button from 'react-bootstrap/Button';
import './commits.css';

function Commits(props){

    let commmits = props.commits.map((commit,index)=>{
        return (
            <div key={commit.sha1+index} className="singleCommit">
                <Button onClick={()=>{props.commitSha1OnClick(commit.sha1)}} variant={"link"}>{commit.sha1}</Button>
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