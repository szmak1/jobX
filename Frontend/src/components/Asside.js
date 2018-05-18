import React, { Component } from "react";

class Asside extends Component {
	constructor(props) {
		super(props);
		this.state = {
			medBild: ""
		};
	}
	componentDidMount() {
		let medBild = localStorage.getItem("medarbetare_titel");
		this.setState({ medBild: medBild });
	}

	render() {
		return (
			<div className={"Asside"}>
				<div className="Asside-container">
					<div className="Asside-image">
						<img src={this.state.medBild} className="Avatar" alt="medarbetare" />
					</div>
					<div className="Asside-text">
						<div className="projektHeadline">
							<h3>Projekt</h3>
						</div>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default Asside;
