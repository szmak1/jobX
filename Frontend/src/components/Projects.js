import React, { Component } from "react";


class Projects extends Component {

	render() {
		return (
			<div className="Projects">
				<div className="vecka">
					<div className="mandag veckaPD">
						<h5>Måndag</h5>
						<div className="cvsInformation">
							<h4 className="projectNumber">Nr:</h4>
							<h4 className="projectName">Name:</h4>
							<h4 className="projectTime">Time:</h4>
						</div>
					</div>
					<div className="tisdag veckaPD">
						<h5>Tisdag</h5>
					</div>
					<div className="onsdag veckaPD">
						<h5>Onsdag</h5>
					</div>
					<div className="torsdag veckaPD">
						<h5>Torsdag</h5>
					</div>
					<div className="fredag veckaPD">
						<h5>Fredag</h5>
					</div>
				</div>
			</div>
		);
	}
}

export default Projects;
