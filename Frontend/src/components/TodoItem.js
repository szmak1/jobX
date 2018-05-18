import React, { Component } from "react";
import { Link } from "react-router-dom";

class TodoItem extends Component {
	constructor(props) {
		super(props);
	}
	removeTodo(id) {
		this.props.removeTodo(id);
	}

	render() {
		return (
			<div className={"TodoItem" + this.props.id }>
				<button
					className="removeTodo"
					onClick={e => this.removeTodo(this.props.id)}
				>
					Ta bort
				</button>
				{this.props.todo.text}
			</div>
		);
	}
}

export default TodoItem;
