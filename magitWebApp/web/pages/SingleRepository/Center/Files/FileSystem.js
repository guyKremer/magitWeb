import React from 'react';
import './FileSystem.css';
import File from './File/File';
import Folder from './Folder/Folder';
import Button from 'react-bootstrap/Button';
import EditFile from './EditFile/EditFile';


function FileSystem(props) {

    let items = props.items.map((item,index)=>{
        if(item.type==="file"){
            return(
                <File key={"fileSystem"+item.name+index} itemOnClick={props.itemOnClick} name={item.name}/>
            );
        }
        else{
            return(
                <Folder key={"fileSystem"+item.name+index} itemOnClick={props.itemOnClick} name={item.name}/>
            );
        }
    });

    let bar = props.fileHierarchy.map((file,index)=>{
        let delimiter='/';
        if(index === 0){
            delimiter="";
        }
        return(<Button key={"bar"+file+index} variant={"link"} size={"lg"} onClick={()=>{props.barButtonOnClick(file,index)}}>{delimiter+file}</Button>)
    });

    if(props.fileEditor===false){
        return(
            <div className={"fileSystem"}>
                <div className={"barSection"}>
                    {bar}
                    {props.canEdit===true ?
                    <button onClick={props.createNewFileOnClick} className={"newFileBtn"}>Create New File</button>
                    :""
                    }
                </div>
                <div className={"itemsSection"}>
                    {items}
                </div>
            </div>
        );
    }
    else{
            return (
                    <EditFile canEdit={props.canEdit} saveOnClick={props.saveOnClick} cancelOnClickHandler={props.editFileCancelOnClickHandler} createNewFile={props.createNewFile} chosenFileContent={props.chosenFileContent}/>
            );
    }


}
export default FileSystem