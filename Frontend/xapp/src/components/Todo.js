import React, { Component } from "react";
import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";
import axios from "axios";

class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			nextId: 3
		};

		this.addTodo = this.addTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
	}

	addTodo(todoText) {
		let todos = this.state.todos.slice();
		todos.push({ id: this.state.nextId, text: todoText });
		this.setState({
			todos: todos,
			nextId: ++this.state.nextId
		});
		const params = { 
			meta: {
				etest: ['something']
			},
			acf: {
				etest: 'something'
			},
			 "field_5ae9d28ff8997['etest']" :"ehsan"
			



		};
		axios
			.put(`http://xapp.tst/wp-json/wp/v2/posts/`+ this.props.post_key , params, {
				headers: {
					"content-type": "application/json",
					"Authorization":'Basic ' + btoa( 'super:admin' )
				}
			})
			.then(res => {
				console.log(res);
				// const persons = res.data;
				this.setState({ posts: res.data });
			});
		//json-to-string
	}

	removeTodo(id) {
		this.setState({
			todos: this.state.todos.filter((todo, index) => todo.id !== id)
		});
	}
	render() {
		console.log()
		return (
			<div className="todo-wrapper">
				<h2>Todo</h2>
				<TodoInput todoText="" addTodo={this.addTodo} />
				<div className="todos">
					<ul>
						{this.state.todos.map(todo => {
							return (
								<TodoItem
									todo={todo}
									key={todo.id}
									id={todo.id}
									removeTodo={this.removeTodo}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default Todo;
