import React, { Component } from "react";
import { Link } from "react-router-dom";

class Anstallda extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="anstallda">
			<div className="wrapThemNow">
				{this.props.children}
			</div>
			</div>
		);
	}
}

export default Anstallda;
