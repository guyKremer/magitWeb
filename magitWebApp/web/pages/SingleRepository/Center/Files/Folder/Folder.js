import React from 'react';
import './folder.css';
import '../FileSystem.css';
import Button from 'react-bootstrap/Button';

export default function Folder(props){

    return(
       <div className={"itemRow"}>
            <div className = "folder"/>
            <Button onClick={()=>{props.itemOnClick(props.name,"","folder")}} variant={"link"} size={"sm"}>{props.name}</Button>
       </div>
    );
}