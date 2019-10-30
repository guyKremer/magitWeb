import React from 'react';
import './file.css';
import '../FileSystem.css';
import Button from 'react-bootstrap/Button';

export default function File(props){

        let onClick= async ()=>{
            let file = await fetch('folderItem?folderItem='+props.name, {method:'GET', credentials: 'include'});
            file = await file.json();
            props.itemOnClick(props.name,file.content,"file")
        }

    return (
        <div className={"itemRow"}>
            <div className="file"/>
            <Button onClick={onClick} variant={"link"} size={"sm"}>{props.name}</Button>
        </div>
    );
}