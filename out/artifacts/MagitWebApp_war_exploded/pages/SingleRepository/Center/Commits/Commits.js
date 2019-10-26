import React from 'react';
import Button from 'react-bootstrap/Button';
import './commits.css';

function Commits(props){

    let commitLinks = props.commitsSha1.map((commitSha1)=>{
        return (
            <Button variant={"link"}>{commitSha1}</Button>
        );
    });
    return(
        <div className={"commits"}>
            <b>Commits</b>
            {commitLinks}
        </div>
    )
}
export default Commits;