import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Asside from "../components/Asside";
import Footer from "../components/Footer";
import Todo from "../components/Todo";
import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";

class Medarbetare extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			posts: [],
			new_user_list: [],
			projekt_list: [],
			m: [],
			t: [],
			o: [],
			th: [],
			f: [],
			todos:""
		};
		this.save_todos = this.save_todos.bind(this);
		this.handleChange = this.handleChange(this);
	}
	componentDidMount() {
		//console.log(this.props.match.params.slug);
		// get ajax
		let that = this;
		axios
			.get(
				`http://xapp.tst/wp-json/wp/v2/posts/` +
					this.props.match.params.slug
			)
			.then(res => {
				//console.log(res);
				// const persons = res.data;

				this.setState({ posts: res.data.acf.projekt });
				let arry = res.data.acf.projekt;
				let new_user_list = [];
				let clicked_user = this.props.match.params.user;
				//console.log('1' ,arry )
				for (var i = arry.length - 1; i >= 0; i--) {
					for (var j = arry[i].timmar.length - 1; j >= 0; j--) {
						let obj = arry[i].timmar[j];

						Object.keys(obj).forEach(function(key) {
							let new_ob = obj[key];

							if (Array.isArray(obj[key])) {
								for (var x = obj[key].length - 1; x >= 0; x--) {
									if (obj[key][x].person == clicked_user) {
										if (
											Array.isArray(
												new_user_list[
													arry[i].project_namn
												]
											)
										) {
										} else {
											new_user_list[
												arry[i].project_namn
											] = [];
											if (
												Array.isArray(
													new_user_list[
														arry[i].project_namn
													][key]
												)
											) {
											} else {
												new_user_list[
													arry[i].project_namn
												][key] = [];
											}
										}

										new_user_list[arry[i].project_namn][
											key
										] =
											obj[key][x].timmar;

										new_user_list[arry[i].project_namn][
											"status"
										] =
											arry[i]["project_status"];
										new_user_list[arry[i].project_namn][
											"nr"
										] =
											arry[i]["project_nr"];
									}
								}
							}
						});
					}
				}
				//end of all loops
				//console.log('1' ,new_user_list )
				this.setState({ projekt_list: new_user_list });
				Object.keys(new_user_list).map(function(key) {
					//console.log(new_user_list);
					{
						/* loopa timar per project*/
					}
					Object.keys(new_user_list[key]).map(function(key2) {
						let value = new_user_list[key][key2];
						//console.log()
						//key = projekt namn
						//key2 = dagarna i veckan
						//value = timmarna

						let state, new_state;

						switch (key2) {
							case "m":
								let m = (
									<div className="cvsInformation">
										<h4 className="projectName">{key}</h4>
										<h4 className="projectTime">
											{value}h
										</h4>
									</div>
								);

								state = that.state.m;
								new_state = [...state, m];
								that.setState({ m: new_state });
								break;
							case "t":
								let t = (
									<div className="cvsInformation">
										<h4 className="projectName">{key}</h4>
										<h4 className="projectTime">
											{value}h
										</h4>
									</div>
								);

								state = that.state.t;
								new_state = [...state, t];
								that.setState({ t: new_state });

								break;
							case "o":
								let o = (
									<div className="cvsInformation">
										<h4 className="projectName">{key}</h4>
										<h4 className="projectTime">
											{value}h
										</h4>
									</div>
								);

								state = that.state.o;
								new_state = [...state, o];
								that.setState({ o: new_state });

								break;
							case "th":
								let th = (
									<div className="cvsInformation">
										<h4 className="projectName">{key}</h4>
										<h4 className="projectTime">
											{value}h
										</h4>
									</div>
								);

								state = that.state.th;
								new_state = [...state, th];
								that.setState({ th: new_state });

								break;
							case "f":
								let f = (
									<div className="cvsInformation">
										<h4 className="projectName">{key}</h4>
										<h4 className="projectTime">
											{value}h
										</h4>
									</div>
								);
								state = that.state.f;
								new_state = [...state, f];
								that.setState({ f: new_state });
						}
					});
				});
			});

			axios
			.get(`http://xapp.tst/wp-json/todo/v1/get-all-todos/`+ this.props.match.params.slug + '/' +  this.props.match.params.user)
			.then(res => {
				console.log('res',res);
				// const persons = res.data;
				this.setState({ todos: res.data.todos });
			});

	}
	save_todos(){
		console.log(1);
		const params = { 
			todo: this.state.todos

		};
		console.log('todos',this.state.todos);
		axios
			.post(`http://xapp.tst/wp-json/todo/v1/save/`+ this.props.match.params.slug + '/' + this.props.match.params.user , params)
			.then(res => {
				
				// const persons = res.data;
				//this.setState({ posts: res.data });
			});
	}
	handleChange(event){
		 //this.setState({todos: event.target.value});
	}
	render() {
		let that = this;
		let days;

		return (
			<div className="home-grid">
				<Header history={this.props.history} />
				<Asside>
					{Object.keys(this.state.projekt_list).map(function(key) {
						
						return (
							<div>
								<h4 key={key} className="AssideProjects">
									{" "}
									{key} - {that.state.projekt_list[key]["nr"]}{" "}
								</h4>
								<p>
									{" "}
									{
										that.state.projekt_list[key]["status"]
									}{" "}
								</p>
							</div>
						);
					})}
				</Asside>

				<div className="Projects">
					<div className="vecka">
						<div className="mandag veckaPD">
							<h5>Måndag</h5>
							{this.state.m}
						</div>
						<div className="tisdag veckaPD">
							<h5>Tisdag</h5>
							{this.state.t}
						</div>
						<div className="onsdag veckaPD">
							<h5>Onsdag</h5>
							{this.state.o}
						</div>
						<div className="torsdag veckaPD">
							<h5>Torsdag</h5>
							{this.state.th}
						</div>
						<div className="fredag veckaPD">
							<h5>Fredag</h5>
							{this.state.f}
						</div>
					</div>
				</div>
				<Footer>
				<textarea ref="textarea" value={this.state.todos} onChange= {(e) => this.setState({ todos: e.target.value })}>

				</textarea>
				<button onClick={this.save_todos} >Save</button>
					{/*<Todo post_key={this.props.match.params.slug} person_key={this.props.match.params.user} />*/}
				</Footer>
			</div>
		);
	}
}

export default Medarbetare;