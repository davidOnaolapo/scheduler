


function getAppointmentsForDay(state, day) {
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

function getInterview(state, interview) {
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

function getInterviewersForDay(state, day) {
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

module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
}



 