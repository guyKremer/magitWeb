import React from 'react';
import FileSystem from './Files/FileSystem';
import Commits from './Commits/Commits';
import MessageBoard from '../../UserDashboard/MessagesBoard/MessagesBoard';

import './center.css';

function Center(props){

    return(
            <div className={"center"}>
                <div className={"fileAndCommits"}>
                    <FileSystem/>
                    <Commits commits={props.commits}/>
                </div>
                <MessageBoard />
            </div>

        );
}

export default Center