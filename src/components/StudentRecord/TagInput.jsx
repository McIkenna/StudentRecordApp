import React, {useState, useRef} from 'react'
import style from "./StudentRecord.module.css"


const TagInput = () => {

    const [tags, setTags] = useState([])
    const inputRef = useRef(null)

    
//This functions adds new tag to individual students details
    const addtag = e =>{
        const value = e.target.value
        if(e.key === "Enter" && value){
            if(tags.find(tag => tag.toLowerCase() === value.toLowerCase())){
                return alert("Tag has been entered before")
            }
           setTags([...tags, value])
           inputRef.current.value = null
        }
    }
    return (
        <div  className={style.tagContainer}>
            

        {/*Tags begins here*/}
            <div className={style.tag}> 
                    <ul>
                        {
                
                              tags.map((tag, i) => 
                              
                              (
                                  <li key={i}>{tag}</li> 
                              )   
                              )
                             
                        }
                    </ul>
            </div>   
                       {/*Tags input*/}                                        
                      <div className={style.tagInputContainer} >
                      
                          <input 
                          type="text" 
                          placeholder="Add a tag" 
                          onKeyDown={addtag}
                          ref={inputRef} />
            
        </div>
        </div>
    )
}


export default TagInput;



