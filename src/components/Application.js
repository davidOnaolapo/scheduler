import React, {useState, useEffect} from "react";
import axios from 'axios';

import "components/Application.scss";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"

import Appointment from "components/Appointment/index"
import Button from "./Button";
import DayList from "./DayList"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    const baseURL = 'http://localhost:8001/api/';
    
    Promise.all([
      axios.get(baseURL + 'days'),
      axios.get(baseURL + 'appointments'),
      axios.get(baseURL + 'interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  const setDay = day => setState({ ...state, day });
  const setDays = (days) => {
    return setState((prev) => ({ ...prev, days }))
  };

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //update db, then state
    return new Promise((resolve, reject) => {
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        return resolve(setState({
          ...state,
          appointments
        }));
      })
      .catch((err) => {
        console.log("I'm in catch block for bookInterview!")
        return reject(console.log(err.message))
      })   
    })  
  }

  const cancelInterview = (id) => {
    return new Promise((resolve, reject) => {
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        return resolve(console.log(res));
      })
      .catch((err) => {
        return reject(console.log(err.message));
      })  
    })     
  }  

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log("state------", state)
  
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
