import React from 'react';
import Commits from './Commits/Commits';
import MessageBoard from '../../UserDashboard/MessagesBoard/MessagesBoard';
import FileSystem from './Files/FileSystem';

import './center.css';

function Center(props){

    return(
            <div className={"center"}>
                    <FileSystem  canEdit={props.isHeadBranchCommit} saveOnClick={props.saveOnClickHandler} editFileCancelOnClickHandler={props.editFileCancelOnClickHandler} createNewFileOnClick={props.createNewFileOnClick} createNewFile={props.createNewFile}  chosenFileContent={props.chosenFileContent} fileEditor={props.fileEditor} itemOnClick={props.itemOnClick} barButtonOnClick={props.barButtonOnClick} mainFolder={props.fileTree.name} items={props.fileTree.content} fileHierarchy={props.fileHierarchy} />
                    <MessageBoard messages={props.messages} />
            </div>
        );
}

export default Center