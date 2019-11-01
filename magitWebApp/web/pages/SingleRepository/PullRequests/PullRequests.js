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

    async componentDidMount() {
        let pullRequests = await fetch('PR', {method:'GET', credentials: 'include'});


    }

    async viewOnClickHandler(targetBranch,baseBranch){
        //fetch call reuturns:
      let files=
            //array of files
            [
                {
                    path:"repo-for-maerge/a.txt",
                    //array of changes
                    changes:[
                        {
                            commitSha1: "0000000000", //the commit that change was made
                            status: "modified", // added/deleted/modified
                            content: "Naor is a dush!!" // if deleted should be empty string
                        }
                    ]
                },
                {
                    path:"repo-for-maerge/a.txt",
                    //array of changes
                    changes:[
                        {
                            commitSha1: "0000000000", //the commit that change was made
                            status: "modified", // added/deleted/modified
                            content: "Naor is a dush!!" // if deleted should be empty string
                        }
                    ]
                },
                {
                    path:"repo-for-maerge/a.txt",
                    //array of changes
                    changes:[
                        {
                            commitSha1: "0000000000", //the commit that change was made
                            status: "modified", // added/deleted/modified
                            content: "Naor is a dush!!" // if deleted should be empty string
                        }
                    ]
                }
            ];
        this.setState(()=>({
            viewPressed: true,
            changedFiles:files
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
                    <Button onClick={()=>{this.viewOnClickHandler(pr.targetBranch,pr.baseBranch)}} size={"sm"} variant={"info"}>View</Button>
                    <Button  size={"sm"} variant={"success"}>Accept</Button>
                    <Button  size={"sm"} variant={"danger"}>Decline</Button>
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
            let singleFileChanges = file.changes .map((change)=>{
                return(
                    <div className={"singleChange"}>
                        <div className={"changeTitle"}>
                            <p>Commit:</p>
                            <p className={"commit"}>{change.commitSha1}</p>
                            <p>Status:</p>
                            <p>{change.status}</p>
                        </div>
                        {
                            change.status==="modified" || change.status === "added" ?
                                <textarea readOnly>
                                    change.content
                                </textarea>
                                :
                                ""
                        }
                    </div>
                );
            });
            return(
            <div className={"fileChanges"}>
                <b>{file.path}</b>
                {singleFileChanges}
            </div>
            );
        });

        return(
            <div className={"changedFiles"}>
                {changedFiles}
            </div>
        )
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