import {useState, useEffect} from "react";
import axios from 'axios';

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  //To resetDb
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
    //create a new day object with resolved spots and appointments using the helper
    // const resolveSpots =  getNewDay(state, state.day, id)[0];
    // const day = resolveSpots[0];
    // const dayId = resolveSpots[1];

    //update db, with appointment, then state of app
    return new Promise((resolve, reject) => {
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        // const days = {
        //   ...state.days,
        //   [dayId]: day
        // }
        return resolve(setState({
          ...state,
          appointments,
          // days
        }));
      })
      .catch((err) => {
        console.log("I'm in catch block for bookInterview!")
        return reject(console.log(err.message))
      })   
    })  
  }

  const cancelInterview = (id) => {
    const day = {

    }
    return new Promise((resolve, reject) => {
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        //setstate for days in resolve
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