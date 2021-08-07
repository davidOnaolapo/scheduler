import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";



export default function InterviewerList(props) {
  console.log("Props in interviewerList", props)
  const interviewers = props.interviewers.map((interviewer) => {
    return <InterviewerListItem 
      key = {interviewer.id}
      name = {interviewer.name} 
      avatar = {interviewer.avatar} 
      selected = {props.interviewer ? interviewer.id === props.interviewer.id : undefined} 
      setInterviewer = {(event) => props.setInterviewer(interviewer.id)}
    />
  })
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {
          interviewers
        }
      </ul>
    </section>
  )
}