import React from 'react';
import './FileSystem.css';
import File from './File/File';
import Folder from './Folder/Folder';
import Button from 'react-bootstrap/Button';
import Navigation from './Navigation/Navigation';


function FileSystem(props) {

    let items = props.items.map((item)=>{
        if(item.type==="file"){
            return(
                <File itemOnClick={props.itemOnClick} name={item.name}/>
            );
        }
        else{
            return(
                <Folder itemOnClick={props.itemOnClick} name={item.name}/>
            );
        }
    });

    let bar = props.fileHierarchy.map((file,index)=>{
        let delimiter='/';
        if(index === 0){
            delimiter="";
        }
        return(<Button variant={"link"} size={"sm"} onClick={()=>{props.barButtonOnClick(file,index)}}>{delimiter+file}</Button>)
    });

        return(
            <div className={"fileSystem"}>
                {bar}
                <div className={"itemsSection"}>
                    {items}
                </div>
            </div>
        );

}
export default FileSystem