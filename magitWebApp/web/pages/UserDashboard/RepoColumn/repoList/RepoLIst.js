import React from 'react';
import Table from 'react-bootstrap/Table';


export default class RepoColumn extends React.Component {

    constructor(props){
        super(props);
        this.state={
            repos:null
        }
    }

    componentDidMount() {
        this.getRepos=this.getRepos.bind(this);

    }

   async getRepos(){
       const response = await fetch('/users/updateUser',{method: 'GET', body:'', credentials: 'include'});


    }

    render() {
        return(
            <Table hover>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
        )
    }
}