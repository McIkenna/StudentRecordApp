import React, { Component, useState, useEffect } from 'react'
import axios from "axios"
import { CalcAverage} from './CalcAverage'
import {FaPlus, FaMinus} from "react-icons/fa"
import style from "./StudentRecord.module.css"
import Tag from './Tag'
import SearchContainer from './SearchContainer'


function StudentRecord(props) {
    const [isLoaded, setLoaded] = useState(false);
    const [students, setStudents] = useState([]);
    const [searchStudent, setSearchStudent] = useState([])
    const [show, setShow] = useState(false);
    const [tags, setTags] = useState([])
    //const [searchTag, setSearchTag] = useState([])
   

   
/* My intention here is to merge the tags and the students object to filter using the tag, this happened to be unsuccessful
    //const mergedStudent = CombinedRecord(students, tags)
  /* const mergedStudent = students.map((item, i) => {
       if(item.id === tags.id + 1){
        Object.assign({},item,tags[i])
       }
    });

    
*/

 //Function to toggle the list of student grades
    const toggle = (index) => {
        if(show === index){
            return setShow(null)
        } 
            setShow(index);
        }
    
    const onChangeHandler = e => {
        const value = e.target.value
        setSearchStudent(value)
        
    }

   

   //Implementing the filter
    const filteredStudents = students.filter(
                            student => {
                    const fullName = student.firstName + " " + student.lastName
                                                if(student.firstName.toLowerCase().includes(searchStudent)|| 
                    student.lastName.toLowerCase().includes(searchStudent) || fullName.toLowerCase().includes(searchStudent)){
                        return student
                    
                    }
                    
                }
            )
        
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
                        <SearchContainer 
                        id={"filter-name"}
                        name={"filter-name"}
                        searchBy={"Search by name"}
                        value={searchStudent}
                        onChange={onChangeHandler}
                        />

                        <SearchContainer 
                        id={"filter-tag"}
                        name={"filter-tag"}
                        searchBy={"Search by tag"}
                        onChange= {() => {}}
                        />
            
                </div>
                {
                    //Used filter to return the searched student firstname and lastname

                    filteredStudents.map((student, index) => (
                        <div key={index} className={style.studentTile}>
                        <div >
                            <img src={student.pic} className={style.Img} alt= "..."/>
                        </div>
                        <div className={style.studentDetails}> 

                        <div className={style.studentHeader}>
                        <div className={style.studentName}>
                        {student.firstName} {student.lastName}
                        </div>        
                        </div>
                        <div className={style.studentInnerContent}> 
                        <div className={style.studentInfo}>
                            <ul>
                            <li>Email: {student.email}</li>
                            <li>Company: {student.company}</li>
                            <li>Skill: {student.skill}</li>
                            <li>Average: {CalcAverage(student.grades)}%</li>
                            </ul>
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
                          
                          <Tag
                            TagItem = {tags}
                            tag = {tags.map((tag, i) => (
                                tag.id === student.id ? 
                                <div key={i} className={style.tag}>{tag.val}</div>: null
                            ))}
                            setTagItem = {setTags}
                            //searchName = {searchTag}       
                            studentId =  {student.id}
                          />
                          
                        </div> 
                        </div>
                        <div className={style.AccordionIcon}  onClick={()=> toggle(index)} key={index}>
                            {show === index ? <span >< FaMinus/></span> : <span>< FaPlus/></span>}
                        </div> 
                        </div>
                       
                        ))}
                        
                        
                        </div>
                        </div>
                        <div>
                            {students.length === 0 && <span>No Records</span>}
                        </div>
                    </div>
                )
            }
           
}


export default StudentRecord