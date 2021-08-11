import React, {useState} from "react";

import "./styles.scss"
import Button from "../Button"
import InterviewerList from "../InterviewerList"


export default function Form(props) {
	const { name, interviewers, interviewer, onSave, onCancel  } = props

	const [userName, setName] = useState(name || "");
	const [latestInterviewer, setInterviewer] = useState(interviewer || null);
	const [error, setError] = useState("");
	const handleNameChange = (event) => {
		setName(event.target.value)
	}
	const cancel = () => {
		reset();
		onCancel();
	}

	const reset = () => {
		setInterviewer(null);
		setName("");
	}

	const save = () => {
		onSave(userName, latestInterviewer);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
	}

	const validate = () => {
		if (userName === "") {
			setError("Student name cannot be blank");
			return;
		}
		setError("");
		save();
	}
	

	return (
		<main className="appointment__card appointment__card--create">
  		<section className="appointment__card-left">
    		<form autoComplete="off">
      		<input
        		className="appointment__create-input text--semi-bold"
        		name="name"
        		type="text"
						value = {userName}
        		placeholder="Enter Student Name"
						onChange={handleNameChange}
						data-testid = "student-name-input"						
        		/*
          		This must be a controlled component
        		*/
      		/>
    		</form>
				<section className="appointment__validation">{error}</section>
    		<InterviewerList interviewers={interviewers} interviewer={latestInterviewer} setInterviewer={setInterviewer} />
  		</section>
  		<section className="appointment__card-right">
    		<section className="appointment__actions">
      		<Button onClick={cancel} danger>Cancel</Button>
      		<Button onSubmit= {handleSubmit} onClick={validate} confirm>Save</Button>
    		</section>
  		</section>
		</main>
	)


}
