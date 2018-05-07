import React, { Component } from "react";
import { Link } from "react-router-dom";

class TodoInput extends Component {
	constructor(props) {
		super(props);
		this.state = { value: this.props.todoText };

		this.handleChange = this.handleChange.bind(this);
		this.addTodo = this.addTodo.bind(this);
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	addTodo(todo) {
		// Ensure a todo was actually entered before submitting
		if (todo.length > 0) {
			this.props.addTodo(todo);
			this.setState({ value: "" });
		}
	}

	render() {
		return (
			<div className={"TodoInput"}>
				<input
					type="text"
					value={this.state.value}
					onChange={this.handleChange}
				/>
				<button
					className="btn btn-primary"
					onClick={() => this.addTodo(this.state.value)}
				>
					Lägg till
				</button>
			</div>
		);
	}
}

export default TodoInput;
