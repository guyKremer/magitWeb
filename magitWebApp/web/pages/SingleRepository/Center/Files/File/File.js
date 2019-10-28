import React from 'react';
import './file.css';
import '../FileSystem.css';
import Button from 'react-bootstrap/Button';

export default function File(props){

    return (
        <div className={"itemRow"}>
            <div className="file"/>
            <Button onClick={()=>{props.itemOnClick(props.name,"file")}} variant={"link"} size={"sm"}>{props.name}</Button>
        </div>
    );
}