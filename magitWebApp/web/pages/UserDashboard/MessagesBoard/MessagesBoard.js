import React from 'react';
import './messages.css';

export default function MessagesBoard (props){

        let messages=props.messages.map((message)=>{
            if(message.type==="forkMsg"){
                return(
                    <div className="Toast Toast--success">
                        <main className="Toast__message">
                            <header className="Toast__message-category">
                                {'You\'ve been forked!'}
                            </header>
                            <p className="Toast__message-text">
                                {message.userName+' has forked '+ message.repositoryName}
                            </p>
                        </main>
                    </div>
                );
            }
            else {
                if(message.status==="pending"){
                    return(
                    <div className="Toast Toast--success">
                        <main className="Toast__message">
                            <header className="Toast__message-category">
                                {message.targetUserName+' has added a PR to '+ message.repositoryName}
                            </header>
                            <p className="Toast__message-text">
                                {"Message: "+message.PRMsg+ "Target branch: "+message.targetBranch+"Base branch: "+message.baseBranch
                                + "Status: "+ message.status}
                            </p>
                        </main>
                    </div>
                    );
                }
                else{
                    return(
                    <div className="Toast Toast--success">
                        <main className="Toast__message">
                            <header className="Toast__message-category">
                                {'Your PR was '+message.status + 'by '+message.baseUser}
                            </header>
                            <p className="Toast__message-text">
                                {"PR Detailes- Message: "+message.PRMsg+ "Target branch: "+message.targetBranch+"Base branch: "+message.baseBranch
                                + "Status: "+ message.status}
                            </p>
                        </main>
                    </div>
                    );
                }

            }
        })


        if(props.messages.length === 0){
            return(
                <div id="messagesWrapper">
                    <b>You have no new messages</b>
                </div>
            );
        }
        else{
            return(
            <div id="messagesWrapper">
                {messages}
            </div>
            );
        }


}
