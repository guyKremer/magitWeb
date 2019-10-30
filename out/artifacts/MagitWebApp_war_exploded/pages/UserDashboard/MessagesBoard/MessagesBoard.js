import React from 'react';
import './messages.css';

export default function MessagesBoard (props){

        let messages=props.messages.map((message)=>{
            if(message.type==="forkMsg"){
                return(
                    <div className="Toast Toast--success">
                        <main className="Toast__message">
                            <header className="Toast__message-category">
                                {message.userName+' has forked '+ props.repositoryName}
                            </header>
                        </main>
                    </div>
                );
            }
            else if (message.type==="PRMsg"){
                <div className="Toast Toast--success">
                    <main className="Toast__message">
                        <header className="Toast__message-category">
                            {message.targetUserName+' has added a PR to '+ props.repositoryName}
                        </header>
                        <p className="Toast__message-text">
                            {"Message: "+props.PRMsg+ "Target branch: "+props.targetBranch+"Base branch: "+props.basisBranch}
                        </p>
                    </main>
                </div>
            }
        })

        return(

            <div id="messagesWrapper">
                {messages}
            </div>
        );
}
