import React from 'react';
import './file.css';
import '../FileSystem.css';
import Button from 'react-bootstrap/Button';

export default function File(props){

    return (
        <div className={"itemRow"}>
            <div className="file"/>
            <Button onClick={async ()=>{
                let file = await fetch('folderItem?folderItem='+props.name, {method:'GET', credentials: 'include'});
                file = await file.json();
                props.itemOnClick(props.name,file.content,"file")
            }}
                    variant={"link"} size={"sm"}>{props.name}</Button>
        </div>
    );
}