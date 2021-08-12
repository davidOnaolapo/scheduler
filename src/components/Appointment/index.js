import React, {Fragment} from "react";
import useVisualMode from "hooks/useVisualMode"


import "./styles.scss"

import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import Form from "./Form.js"
import Status from "./Status.js"
import Confirm from "./Confirm.js"
import Error from "./Error.js"

//Modes
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {
	const { time, id, interview, interviewers, bookInterview, cancelInterview, editInterview } = props;
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	)

	const create = () => {
		transition(CREATE);
	}

	const onCancel = () => {
		back();
	}
	//To book an interview
	const save = (name, interviewer) => {
		if(interviewer) {
			const interview = {
				student: name,
				interviewer: interviewer.id
			};

			transition(SAVING);

			bookInterview(id, interview)
			.then((res) => {
				transition(SHOW);
			})
			.catch((err) =>{
				console.log(err);
				transition(ERROR_SAVE, true);
			})
		}			
	}
	//When deletion is confirmed
	const onConfirmDelete = () => {
		transition(DELETING);
		
		cancelInterview(id)
			.then((res) => {
				transition(EMPTY);		
			})
			.catch((err) => {
				transition(ERROR_DELETE, true);
			})		
	}

	const onDelete = () => {
		transition(CONFIRM)
	}

	const onEdit = () => {
		transition(EDIT);
	}
	
	return (
		<Fragment >
			<section>
				<Header time = {time}/>
			</section>
			<div  data-testid="appointment">
				{mode === EMPTY && <Empty onAdd={create} />}
				{mode === SHOW && (
  				<Show
    				student={interview.student}
    				interviewer={interview.interviewer}
						onEdit={onEdit} 
    				onDelete={onDelete} 
  				/>
				)}
				{mode === CREATE && <Form onCancel= {onCancel} interviewers={interviewers} onSave={save}/>}
				{mode === EDIT && <Form name={interview.student} interviewer={interview.interviewer} 
					onCancel= {onCancel} interviewers={interviewers} onSave={save}/>}
				{mode === SAVING && <Status message={SAVING} />}
				{mode === DELETING && <Status message={DELETING} />}
				{mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" 
					onCancel={onCancel} onConfirm={onConfirmDelete} />}
				{mode === ERROR_SAVE  && <Error message="Error Saving Appointment" onClose = {onCancel} />}
				{mode === ERROR_DELETE  && <Error message="Error Deleting Appointment" onClose = {onCancel} />}			
			
			</div>
		</Fragment>	
	)
}
