import React from 'react';
import FileSystem from './Files/FileSystem';
import Commits from './Commits/Commits';
import './center.css';

function Center(props){

    return(
        <div className={"center"}>
            <FileSystem/>
            <Commits commitsSha1={props.commitsSha1}/>
        </div>
        );
}

export default Center