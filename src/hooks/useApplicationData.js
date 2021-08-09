import {useState, useEffect} from "react";
import axios from 'axios';

import { updateSpots } from "helpers/selectors"

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  // To resetDb
  // axios.get(`http://localhost:8001/api/debug/reset`)
  //   .then((yo) => console.log("Ireset", yo))

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

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //update db, with appointment, then state of app
    return new Promise((resolve, reject) => {
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        const days = updateSpots(state, state.day, "creating");
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
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        const days = updateSpots(state, state.day, "Deleting")
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