import React from 'react';
import './messages.css';

export default function MessagesBoard (props){

        let messages=props.messages.map((message,index)=>{
            if(message.type==="forkMsg"){
                return(
                    <div key={"forked"+index} className="Toast Toast--success">
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
                if(message.status==="WAITING"){
                    return(
                    <div key={"prAdd"+index} className="Toast Toast--success">
                        <main className="Toast__message">
                            <header className="Toast__message-category">
                                {message.creatorUserName+' has added a pr to '+ message.repositoryName}
                            </header>
                            <p className="Toast__message-text">
                                {"Message:"+message.PRMsg+ "   Target-branch:"+message.targetBranch+"   Base-branch:"+message.baseBranch}
                            </p>
                        </main>
                    </div>
                    );
                }
                else{
                    return(
                    <div key={"review"+index} className="Toast Toast--success">
                        <main className="Toast__message">
                            <header className="Toast__message-category">
                                {'Your PR was '+message.status + ' by '+message.targetUserName}
                            </header>
                            <p className="Toast__message-text">
                                {"PR Detailes- Message:"+message.PRMsg+ "   Target-branch:"+message.targetBranch+"   Base-branch:"+message.baseBranch}
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
