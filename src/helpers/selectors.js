export const getAppointmentsForDay = (state, day) => {
  if(state.days.length === 0) {
    return []
  }
  const days = [...state.days]
  const appointments = state.appointments

  let appointmentsForDay = [];
  let foundAppointments = [];

  for (let currDay of days) {
    if (currDay.name === day) {
     foundAppointments = [...currDay.appointments];
     console.log(foundAppointments)
    }
  }

  for (let appointment of foundAppointments) {
    appointmentsForDay.push(appointments[appointment])
  }
  return appointmentsForDay;
}

export const getInterview = (state, interview) => {
  if(!interview) {
    return null
  }

  let interviewData = {};
  let interviewer = {};

  const interviewerId = interview.interviewer;

  //add student name to new obj
  interviewData.student = interview.student

  //add to new interviewer object
  interviewer.id = interview.interviewer;
  interviewer.name = state.interviewers[interviewerId].name;
  interviewer.avatar = state.interviewers[interviewerId].avatar;

  //add new interviewer obj to new obj
  interviewData.interviewer = interviewer

  return interviewData;
}

export const getInterviewersForDay = (state, day) => {
  if(state.days.length === 0) {
    return []
  }
  const days = [...state.days]
  const interviewers = state.interviewers

  let InterviewersForDay = [];
  let foundInterviewers = [];

  for (let currDay of days) {
    if (currDay.name === day) {
     foundInterviewers = [...currDay.interviewers];
    }
  }

  for (let interviewer of foundInterviewers) {
    InterviewersForDay.push(interviewers[interviewer])
  }
  return InterviewersForDay;
}

export const updateSpots = (dayName, days, appointments) => {
  const newDays = [...days]

  //get the day obj
  const index = newDays.findIndex(day => day.name === dayName);
  const dayObj = newDays[index];

  let spots = 0;
  for (const id of dayObj.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      spots++;
    }
  }
  console.log("spots____ = ", spots);

  const newDay = { ...dayObj, spots}

  newDays[index] = newDay
  return newDays;
}




 
