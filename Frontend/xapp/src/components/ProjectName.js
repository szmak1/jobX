import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProjectName extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="ProjectName">
				<div className="Asside-text">
					<h4 className="AssideProjects">Holygreens</h4>
					<h4 className="AssideProjects">öKraft</h4>
					<h4 className="AssideProjects">UniLever</h4>
					<h4 className="AssideProjects">Sant Lars Park</h4>
					<h4 className="AssideProjects">Zest</h4>
					<h4 className="AssideProjects">xApp</h4>
				</div>
			</div>
		);
	}
}

export default ProjectName;
