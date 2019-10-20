import React from 'react';
import ReactDOM from 'react-dom';
import Manager from '../magitWebApp/web/pages/Manager'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>(
    <Manager location="login" />
);

ReactDOM.render(<App />, document.getElementById("root"));