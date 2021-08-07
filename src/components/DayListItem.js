import React, { useState } from "react";
import classNames from 'classnames/bind';


import "components/DayListItem.scss";


export default function DayListItem(props) {
  const [count, setCount] = useState(0);

  const formatSpots = () => {
    if(count !== props.spots) {
      setCount(count+1);
    }     
    props.setDay(props.name)  
  }

  const dayItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })
  
  return (
    <li onClick={formatSpots} className={dayItemClass}>
      <h2 className="text--regular">{props.name}</h2>
      {((props.spots - count) === 0) &&
        <h3 className="text--light">no spots remaining</h3> 
      }
      {((props.spots - count) === 1) &&
        <h3 className="text--light">1 spot remaining</h3> 
      }
      {((props.spots - count) > 1) &&
        <h3 className="text--light">{props.spots - count} spots remaining</h3>
      }
    </li>
  );
}