import React from 'react';
import ReactDOM from 'react-dom';
import Manager from '../magitWebApp/web/pages/Manager'

const App = () =>(
    <Manager location="login" />
);

ReactDOM.render(<App />, document.getElementById("root"));