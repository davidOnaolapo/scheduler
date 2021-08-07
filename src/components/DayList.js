import React from "react";

import DayListItem from "components/DayListItem"


export default function DayList(props) {
    const {days, day, setDay} = props;

    const allDays = days.map((givenDay) => {
      return <DayListItem
        key={givenDay.id}  
        name={givenDay.name} 
        spots={givenDay.spots} 
        selected={givenDay.name === day}
        setDay={setDay}  
      />
    })
    return (
      <ul>
        {
          allDays
        }
      </ul>
    );
}