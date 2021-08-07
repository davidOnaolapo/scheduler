import React, {useState} from "react";

import "components/InterviewerListItem.scss";
import classNames from 'classnames/bind';



export default function InverviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props

  const handleSelection = (event) => {
    //set the state to have the current celected interviewer
    setInterviewer();

  }

  const interviewerItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  })

  return (
    <li className={interviewerItemClass}  onClick={handleSelection}>
      <img className="interviewers__item-image" src={avatar} alt={name}/>
        {selected && name}
    </li>
    
  )
}