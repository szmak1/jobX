import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormNote from "./FormNote";
import ProjectName from "./ProjectName";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

class Footer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={"Footer"}>
				 {this.props.children}
			</div>
		);
	}
}

export default Footer;
