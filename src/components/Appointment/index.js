import React, {Fragment} from "react";
import useVisualMode from "hooks/useVisualMode"


import "./styles.scss"

import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import Form from "./Form.js"
import Status from "./Status.js"
import Confirm from "./Confirm.js"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


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

	const save = (name, interviewer) => {
		const interview = {
			student: name,
			interviewer
		};
		transition(SAVING);

		bookInterview(id, interview)
			.then((res) => {
				transition(SHOW);
			})		
	}

	const onConfirmDelete = () => {
		transition(DELETING);
		
		cancelInterview(id)
			.then((res) => {
				transition(EMPTY);		
			})		
	}

	const onDelete = () => {
		transition(CONFIRM)
	}

	const onEdit = () => {
		transition(EDIT);
	}
	
	return (
		<Fragment>
			<section>
				<Header time = {time}/>
			</section>
			<div>
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
			</div>
		</Fragment>	
	)
}
