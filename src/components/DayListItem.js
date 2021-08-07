import React, { useState } from "react";
import classNames from 'classnames/bind';


import "components/DayListItem.scss";


export default function DayListItem(props) {
  const { spots, name, selected, setDay } = props;
  const [count, setCount] = useState(0);

  const formatSpots = () => {
    if(count !== spots) {
      setCount(count+1);
    } 
    
    if(count !== spots) {
      setCount(count-1);
    }  
    setDay(name)  
  }

  const dayItemClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  })
  
  return (
    <li onClick={formatSpots} className={dayItemClass}>
      <h2 className="text--regular">{name}</h2>
      {((spots - count) === 0) &&
        <h3 className="text--light">no spots remaining</h3> 
      }
      {((spots - count) === 1) &&
        <h3 className="text--light">1 spot remaining</h3> 
      }
      {((spots - count) > 1) &&
        <h3 className="text--light">{spots - count} spots remaining</h3>
      }
    </li>
  );
}