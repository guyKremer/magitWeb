import React from 'react';
import './pullRequests.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default class PullRequests extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pullRequests:[{
                userName:"keren",
                targetBranch:"target",
                baseBranch:"base",
                date:"31/10/2019",
                status:"open"
            }]
        }
    }

    async viewOnClickHandler(targetBranch,baseBranch){
        //fetch call
    }

    render() {
        let pullRequestView = this.state.pullRequests.map((pr,index)=>{
            return(
            <tr>
                <td>{index}</td>
                <td>{pr.userName}</td>
                <td>{pr.targetBranch}</td>
                <td>{pr.baseBranch}</td>
                <td>{pr.date}</td>
                <td>{pr.status}</td>
                <Button onClick={()=>{this.viewOnClickHandler(pr.targetBranch,pr.baseBranch)}} size={"sm"} variant={"success"}>View</Button>
            </tr>
            );
        });
        return (
            <Table >
                <thead>
                <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Target branch</th>
                    <th>Base branch</th>
                    <th>Date of creation</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {pullRequestView}
                </tbody>
            </Table>
        );
    }
}