import React, { Component, useState, useEffect } from 'react'
import axios from "axios"
import { CalcAverage} from './CalcAverage'
import {FaPlus, FaMinus} from "react-icons/fa"
import style from "./StudentRecord.module.css"


function StudentRecord() {
    const [isLoaded, setLoaded] = useState(false);
    const [students, setStudents] = useState([]);
    const [searchStudent, setSearchStudent] = useState([])
    const [show, setShow] = useState(false);
    const [tags, setTags] = useState([]);
    const [newTags, setNewTags] = useState([]);

    //Function to toggle the list of student grades
    const toggle = (index) => {
        if(show === index){
            return setShow(null)
        } 
            setShow(index);
        }

        //This functions adds new tag to individual students details
    const addTags = index => (e) => {
        
            if(e.key === "Enter" &&  e.target.value !== ""){
                console.log(index);
               setTags([...tags,  e.target.value]);   
               e.target.value =""; 
            }                
    }
      
    //Fetching data from the Api endpoint provided
    useEffect(() => {
        async function getStudent(){
           const response = await axios.get('https://api.hatchways.io/assessment/students')
                    setLoaded(true)
                    setStudents(response.data.students)
                                }
                getStudent()
        
    }, [])

    //Created a condition to make sure contents are displayed 
        if(!isLoaded){
            return(<div>Loading... </div>)
        }
        else 
        {                
            return (
            <div className={style.student}>
                <div className={style.studentInnner}>
                    <div className={style.studentContent}>
                    <div className={style.search}>
            <div className={style.searchContainer}>
                <div className={style.inputContainer}>
                    <input 
               
                    type="text" 
                    id="filter-students"
                    name="filter-students"
                    placeholder="Search by name" 
                    onChange={(e) => setSearchStudent(e.target.value)}
                    />
                    
                </div>
                </div>
                </div>
                {
                    //Used filter to return the searched student firstname and lastname
                students.filter(stud => {
                            if(searchStudent === ""){
                                return stud
                            }else if(stud.firstName.toLowerCase().includes(searchStudent)|| 
                            stud.lastName.toLowerCase().includes(searchStudent)){
                                return stud
                        }
                    }).map((student, index) => (
                        <div key={student.id} className={style.studentTile}>
                        <div >
                            <img src={student.pic} className={style.Img} alt= "..."/>
                        </div>
                        <div className={style.studentDetails}> 

                        <div className={style.studentHeader}>
                        <div className={style.studentName}>
                        {student.firstName} {student.lastName}
                        </div>
                                    
                        </div>
                        <div className={style.studentInfo}>
                            <ul>
                            <li>Email: {student.email}</li>
                            <li>Company: {student.company}</li>
                            <li>Skill: {student.skill}</li>
                            <li>Average: {CalcAverage(student.grades)}%</li>
                            </ul>
                          </div>

                            {/*Obtain the tags */}
                          <div className={style.tag}> {
                              
                                tags.map((tag, i) => (
                                    <li key={i}>{tag}</li> 
                                    
                                ))
                                }
                        </div>  
                      
                                                                  
                        <div className={style.tagContainer} key={index}>
                        
                            <input 
                            type="text" 
                            id={`tag-${student.id}`}
                            name={`${student.id}`}
                            placeholder="Add a tag" 
                            onKeyUp={addTags(index)}
                            onChange={() => { console.log(`${student.id} ${index}`)}}
                          
                                                               />
                                                               </div>  
                          {show === index ? 
                          (
                            <div className={`${style.studentGradeActive}`}>
                            <ul>{student.grades.map((grade, index) => {
                                  return(
                                      <table className={style.studentTable} key={index}>
                                          <tbody>
                                          <tr>
                                          <td >{`Test ${index + 1}:`}  </td>
                                          <td>{`${grade}%`}</td>
                                          </tr>
                                          </tbody>
                                                                                  
                                      </table>
                                      
                                  )
                              })}
  
                              </ul>
                              </div>


                          ) : null}
                          
                        </div> 
                        <div className={style.AccordionIcon}  onClick={()=> toggle(index)} key={index}>
                            {show === index ? <span >< FaMinus/></span> : <span>< FaPlus/></span>}
                        </div> 
                        </div>
                       
                        ))}
                        </div>
                        </div>
                    </div>
                )
            }
           
}


export default StudentRecord