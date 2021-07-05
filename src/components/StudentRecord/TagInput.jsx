import React, {useState, useRef} from 'react'
import style from "./StudentRecord.module.css"


const TagInput = (props) => {
    const setSearchTag = props.setSearchTag


    const [tags, setTags] = useState([])
    const inputRef = useRef(null)

    
//This functions adds new tag to individual students details
    const addtag = e =>{
        const {value, name} = e.target
        if(e.key === "Enter" && value){
            if(tags.find(tag => tag.val.toLowerCase() === value.toLowerCase())){
                return alert("Tag has been entered before")
            }
           setTags([...tags, {val: value, id: props.studentId}])
          
           inputRef.current.value = null
        }
      
    }
    console.log(tags)
    return (
        <div  className={style.tagContainer}>
            

        {/*Tags begins here*/}
            <div className={style.tag}> 
                    <ul>
                        {
                
                              tags.map((tag, i) => 
                              
                              (
                                  <li key={i}>{tag.val}</li> 
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



