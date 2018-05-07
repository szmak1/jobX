import React, { Component } from "react";
import { Link } from "react-router-dom";


class Asside extends Component {
	constructor(props) {
		super(props);
		this.state = {
			medBild: "" ,
		};
		
	}
	componentDidMount() {
		let medBild = localStorage.getItem('medarbetare_titel');
		this.setState({ medBild: medBild});

	}

	render() {
		
		return (
			<div className={"Asside"}>

				<div className="Asside-container">
					<div className="Asside-image">
						<img src={this.state.medBild} className="Avatar" />
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
