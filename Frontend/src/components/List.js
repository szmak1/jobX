import React, { Component } from "react";
import { Link } from "react-router-dom";

class List extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="List">
				{this.props.children}
			</div>
		);
	}
}

export default List;
