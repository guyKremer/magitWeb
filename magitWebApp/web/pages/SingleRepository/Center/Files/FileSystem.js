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
        return(<Button variant={"link"} size={"lg"} onClick={()=>{props.barButtonOnClick(file,index)}}>{delimiter+file}</Button>)
    });

    if(props.fileEditor===false){
        return(
            <div className={"fileSystem"}>
                <div className={"barSection"}>
                    {bar}
                    <button className={"newFileBtn"}>Create New File</button>
                </div>
                <div className={"itemsSection"}>
                    {items}
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                    Edit File
                </label>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                >
                    {props.chosenFileContent}
                </textarea>
                <button>Save</button>
                <button>Cancel</button>
            </div>
        );
    }


}
export default FileSystem