import React from "react";

import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData"
import Appointment from "components/Appointment/index"
import DayList from "./DayList"

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const appointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return <Appointment key={appointment.id} id={appointment.id} 
      time={appointment.time} interview={interview}
      interviewers={interviewers} bookInterview = {bookInterview} 
      cancelInterview = {cancelInterview}/>
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay}/>
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {
          appointments
        }
      </section>
    </main>
  );
}
