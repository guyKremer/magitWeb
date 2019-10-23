import React from 'react';
import ReactDOM from 'react-dom';
import Manager from '../magitWebApp/web/pages/Manager'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
} from "react-router-dom";

const App = () =>(
    <Router>
        <Manager location="login" />
    </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));