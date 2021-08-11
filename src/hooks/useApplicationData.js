import {useState, useEffect} from "react";
import axios from 'axios';

import { updateSpots } from "helpers/selectors"

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    
    Promise.all([
      axios.get( '/api/days'),
      axios.get(  '/api/appointments'),
      axios.get(  '/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //update db, with appointment, then state of app
    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        const days = updateSpots(state.day, state.days, appointments);
        setState({
          ...state,
          appointments,
          days
        })

        return resolve();
      })
      .catch((err) => {
        console.log("I'm in catch block for bookInterview!")
        return reject(console.log(err.message))
      })   
    })  
  }

  const cancelInterview = (id) => {
    
    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const appointments = {
          ...state.appointments,
        }
        appointments[id].interview = null;

        const days = updateSpots(state.day, state.days, appointments);
        setState({
          ...state,
          days
        })      
        return resolve(console.log(res));
      })
      .catch((err) => {
        return reject(console.log(err.message));
      })  
    })     
  } 

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}