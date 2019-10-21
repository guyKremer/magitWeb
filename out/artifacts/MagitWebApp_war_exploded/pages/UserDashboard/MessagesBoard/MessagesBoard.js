import React from 'react';
import './messages.css';

export default class MessagesBoard extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div id="messagesWrapper">
                <div className="Toast Toast--success">
                    <main className="Toast__message">
                        <header className="Toast__message-category">Check</header>
                        <p className="Toast__message-text">check check check check</p>
                    </main>
                </div>
                <div className="Toast Toast--success">
                    <main className="Toast__message">
                        <header className="Toast__message-category">Check
                        </header>
                        <p className="Toast__message-text">check check check check
                        </p>
                    </main>
                </div>
            </div>
        );
    }


}
