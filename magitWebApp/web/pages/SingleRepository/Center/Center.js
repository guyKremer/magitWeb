import React from 'react';
import Commits from './Commits/Commits';
import MessageBoard from '../../UserDashboard/MessagesBoard/MessagesBoard';

import './center.css';

function Center(props){

    return(
            <div className={"center"}>
                    <MessageBoard />
            </div>
        );
}

export default Center