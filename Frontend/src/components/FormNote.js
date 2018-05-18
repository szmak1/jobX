import React, { Component } from "react";
import { Link } from "react-router-dom";

class FormNotes extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="FormNotes">
				<h3 className="anteckningar">Anteckningar</h3>
				<textarea rows="4" cols="50" name="comment" form="usrform">
					Skriv här dina anteckningar
				</textarea>
			</div>
		);
	}
}

export default FormNotes;
