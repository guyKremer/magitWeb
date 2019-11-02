import React from 'react';
import './pullRequests.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default class PullRequests extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pullRequests:[],
            viewPressed:false,
            changedFiles:[]
        }

        this.prListRender=this.prListRender.bind(this);
        this.singlePrRender=this.singlePrRender.bind(this);
        this.acceptOrDeclineOnClickHandler=this.acceptOrDeclineOnClickHandler.bind(this);
        this.singlePrBackOnClickHandler=this.singlePrBackOnClickHandler.bind(this);
    }

    async componentDidMount() {
        let pullRequests = await fetch('PR?repository='+this.props.repository, {method:'GET', credentials: 'include'});
        pullRequests = await pullRequests.json();
        this.setState(()=>({
            pullRequests : pullRequests
        }));
    }

    async viewOnClickHandler(date){
        let changedFiles = await fetch('PRData?repository='+this.props.repository+'&date='+date, {method:'GET', credentials: 'include'});
        changedFiles = await changedFiles.json();
        this.setState(()=>({
            viewPressed: true,
            changedFiles:changedFiles
        }))
    }

    prListRender(){
        let pullRequestView = this.state.pullRequests.map((pr,index)=>{
            return(
                <React.Fragment>
                    <Button variant={"success"} onClick={this.props.pullRequestBackButtonOnClick}>Back</Button>
                    <tr>
                        <td>{index}</td>
                        <td>{pr.msg}</td>
                        <td>{pr.userCreator}</td>
                        <td>{pr.targetBranch}</td>
                        <td>{pr.baseBranch}</td>
                        <td>{pr.date}</td>
                        <td>{pr.status}</td>
                        <Button onClick={()=>{this.viewOnClickHandler(pr.date)}} size={"sm"} variant={"info"}>View</Button>
                        <Button  onClick={()=>{this.acceptOrDeclineOnClickHandler(pr.date,"accept")}} size={"sm"} variant={"success"}>Accept</Button>
                        <Button  onClick={()=>{this.acceptOrDeclineOnClickHandler(pr.date,"decline")}} size={"sm"} variant={"danger"}>Decline</Button>
                    </tr>
                </React.Fragment>

            );
        });
        return (
            <React.Fragment>
                <Button variant={"success"} onClick={this.singlePrBackOnClickHandler}>Back</Button>
                <Table >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Message</th>
                        <th>Creator</th>
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
            </React.Fragment>
        );
    }

   async acceptOrDeclineOnClickHandler(date,status){
        await fetch('PRData?repository='+this.props.repository+'&date='+date+'&status='+status, {method:'POST',body:'', credentials: 'include'});
        let pullRequests = await fetch('PR?repository='+this.props.repository, {method:'GET', credentials: 'include'});
        pullRequests = await pullRequests.json();
        this.setState(()=>({
            pullRequests : pullRequests
        }));
    }

    singlePrBackOnClickHandler(){
        this.setState(()=>({
            viewPressed: false,
            changedFiles:[]
        }))
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
                                    {change.content}
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