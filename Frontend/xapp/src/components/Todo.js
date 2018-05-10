import React, { Component } from "react";
import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";
import axios from "axios";

class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			nextId: Math.round(Math.floor((Math.random() * 100) + 1) ),
		};

		this.addTodo = this.addTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.updateTodo = this.updateTodo.bind(this);
	}
	componentDidMount() {

		axios
			.get(`http://xapp.tst/wp-json/todo/v1/get-all-todos/`+ this.props.post_key + '/' +  this.props.person_key)
			.then(res => {
				console.log('res',res);
				// const persons = res.data;
				this.setState({ todos: res.data.todos });
			});
	}

	addTodo(todoText) {
		let todos = this.state.todos.slice();
		todos.push({ id: this.state.nextId, text: todoText });
		this.setState({
			todos: todos,
			nextId: ++this.state.nextId
		});
		this.updateTodo();
		console.log('todos1',this.state.todos);

	}

	removeTodo(id) {
		this.setState({
			todos: this.state.todos.filter((todo, index) => todo.id !== id)
		});
		this.updateTodo();
	}
	updateTodo(){
		const params = { 
			todo: this.state.todos

		};
		console.log('todos',this.state.todos);
		axios
			.post(`http://xapp.tst/wp-json/todo/v1/save/`+ this.props.post_key + '/' +  this.props.person_key , params)
			.then(res => {
				
				// const persons = res.data;
				//this.setState({ posts: res.data });
			});

	}
	render() {
		
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
