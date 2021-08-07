import React, {useState} from "react";

import "components/InterviewerListItem.scss";
import classNames from 'classnames/bind';



export default function InverviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props

  const [beenSelected, setSelected] = useState(selected)

  const handleSelection = (event) => {
    setInterviewer();
    if(beenSelected) {
      setSelected(false);
    } else {
      setSelected(true);
    }
  }

  const interviewerItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": beenSelected,
  })

  return (
    <li className={interviewerItemClass}  onClick={handleSelection}>
      <img className="interviewers__item-image" src={avatar} alt={name}/>
        {beenSelected && name}
    </li>
    
  )
}