import React from 'react'
import style from "./StudentRecord.module.css"

export default function InputTag(props) {
    return (
        <div>
            <div className={style.tagInputContainer} >
                      
                      <input 
                      type="text" 
                      placeholder="Add a tag" 
                      onKeyDown= {props.addTag}
                      
                      ref={props.inputRef}/>
                      </div>
        </div>
    )
}
