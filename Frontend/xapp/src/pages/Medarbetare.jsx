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
			projekt_list:[],
			m:[],
			t:[],
			o:[],
			th:[],
			f:[],
		};
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

				for (var i = arry.length - 1; i >= 0; i--) {
					
					for (var j = arry[i].timmar.length - 1; j >= 0; j--) {
						
						let obj = arry[i].timmar[j];

						Object.keys(obj).forEach(function(key) {
							let new_ob = obj[key];

							if (Array.isArray(obj[key])) {
								for (var x = obj[key].length - 1; x >= 0; x--) {
									if (obj[key][x].person == clicked_user) {
										if (Array.isArray(new_user_list[arry[i].project_namn])) {

										} else {
											new_user_list[arry[i].project_namn] = [];
											if (Array.isArray(new_user_list[arry[i].project_namn][key]) ) {

											}else{
												new_user_list[arry[i].project_namn][key]= [];
											}
										}

										new_user_list[arry[i].project_namn][key] = obj[key][x].timmar;

										//new_user_list[arry[i].project_namn][key]['status'] = arry[i];
										
									}
								}
							}
						});
					}
				}
				//end of all loops
				console.log('1' ,new_user_list )
				this.setState({ projekt_list: new_user_list });
				Object.keys(new_user_list).map(function(key) {
							//console.log(new_user_list);
							{/* loopa timar per project*/}
							Object.keys(new_user_list[key]).map(function(key2){
									let value = new_user_list[key][key2];

									//key = peoject namn
									//key2 = dagarna i veckan
									//value = timmarna
									
									let state,new_state;
									
									
									switch(key2){
										case "m":
											let m = <div className="cvsInformation">
													<h4 className="projectName">Name:{key}</h4>
													<h4 className="projectTime">Time:{value }</h4>
												</div>

											state = that.state.m ;
											new_state = [...state, m];
											that.setState({ m: new_state });
										break;
										case "t":
											let t = <div className="cvsInformation">
													<h4 className="projectName">Name:{key}</h4>
													<h4 className="projectTime">Time:{value }</h4>
												</div>

											state = that.state.t ;
											new_state = [...state, t];
											that.setState({ t: new_state });

										break;
										case "o":
											let o = <div className="cvsInformation">
													<h4 className="projectName">Name:{key}</h4>
													<h4 className="projectTime">Time:{value }</h4>
												</div>

											state = that.state.o ;
											new_state = [...state, o];
											that.setState({ o: new_state });

										break;
										case "th":
											let th = <div className="cvsInformation">
													<h4 className="projectName">Name:{key}</h4>
													<h4 className="projectTime">Time:{value }</h4>
												</div>

											state = that.state.th ;
											new_state = [...state, th];
											that.setState({ th: new_state });

										break;
										case "f":
											let f = <div className="cvsInformation">
													<h4 className="projectName">Name:{key}</h4>
													<h4 className="projectTime">Time:{value }</h4>
												</div>

											state = that.state.f ;
											new_state = [...state, f];
											that.setState({ f: new_state });


									}
									


							}); 
						


						
				})


			});
	}
	render() {
		
		let that = this;
		let days;

		return (
			<div  className="home-grid">
			<Header history={this.props.history}  />
				<Asside>

					{Object.keys(this.state.projekt_list).map(function(key) {
					
					   						return(
					   							<h4 key={key} className="AssideProjects"> {key} </h4>


					   							)
										
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
			 <Todo post_key={this.props.match.params.slug}/>
			</Footer>
			</div>
		);
	}
}

export default Medarbetare;
