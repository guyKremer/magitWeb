import React from 'react';


export default function EditFile(props) {

    if(!props.createNewFile){
        return (
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                    Edit File
                </label>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    defaultValue={props.chosenFileContent}
                />
                <button>Save</button>
                <button onClick={props.cancelOnClickHandler}>Cancel</button>
            </div>
        );
    }

    else{
        return(
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
                Enter File Name:
            </label>
            <input type={"text"} id={"fileName"}/>
            <textarea
                className="form-control"
                id="fileContenttextArea"
                rows="5"
            />
            <button onClick={()=>{
                let fileName=document.getElementById("fileName").value
                let fileContent=document.getElementById("fileContenttextArea").value
                props.saveOnClick(fileName,fileContent);}}>
                Save</button>
            <button onClick={props.cancelOnClickHandler}>Cancel</button>
        </div>
        );
    }
}