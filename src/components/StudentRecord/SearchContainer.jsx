import React from 'react'
import style from "./StudentRecord.module.css"
const SearchContainer = (props) => {
    return (
        <div>
            <div className={style.searchContainer}>
                <div className={style.inputContainer}>
                    <input 
               
                    type="text" 
                    id={props.id}
                    name={props.name}
                    value = {props.value}
                    placeholder={props.searchBy} 
                    onChange={props.onChange}
                    />
                    
                </div>
                </div>
        </div>
    )
}

export default SearchContainer