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
            }],
            viewPressed:false,
            changedFiles:[]
        }

        this.prListRender=this.prListRender.bind(this);
        this.singlePrRender=this.singlePrRender.bind(this);
    }

    async viewOnClickHandler(targetBranch,baseBranch){
        //fetch call reuturns:
      let files=
            //array of files
            [
                {
                    filePath:"repo-for-maerge/a.txt",
                    //array of changes
                    changes:[
                        {
                            commit: "0000000000", //the commit that change was made
                            status: "modified", // added/deleted/modified
                            content: "Naor is a dush!!" // if deleted should be empty string
                        }
                    ]
                }
            ];
        this.setState(()=>({
            viewPressed: true,
            changedFiles:file
        }))
    }

    prListRender(){
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

    singlePrRender(){
        let changedFiles=this.state.changedFiles.map((file)=> {
            let singleFile
        });
    }

    render() {
        if(this.state.viewPressed===false){
            return this.prListRender();
        }
        else{
            return this.singlePrRender();
        }
    }
}