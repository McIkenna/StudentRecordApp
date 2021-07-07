import React, {useState, useRef, useEffect} from 'react'
import style from "./StudentRecord.module.css"
import InputTag from './InputTag'


const TagInput = (props) => {


    
    const tags = props.TagItem
    const setTags = props.setTagItem
    const inputRef = useRef(null)

    
//This functions adds new tag to individual students details
    const addtag = e =>{
        const {value, name} = e.target
            if(e.key === "Enter" && value){
           setTags([...tags, {val: value, id: props.studentId}])
          
           inputRef.current.value = null
        }
      
    }

    return (
        <div  className={style.tagContainer}>
            

        {/*Tags begins here*/}
            <div  className={style.tags}> 
            {props.tag}
            </div>   
                       {/*Tags input*/}                                        
                      
         <InputTag
         addTag = {addtag}
         inputRef = {inputRef}
         />
        </div>
    )
}


export default TagInput;



