import React from 'react';
import './FileSystem.css';
import Button from 'react-bootstrap/Button';

function FileSystem(props){

        return(
            <div className={"fileSystem"}>
                <span>
                    <div className="file"/>
                </span>
                <span>
                    <div className = "folder"/>
                </span>

            </div>
        );
}
export default FileSystem