import React, { Component } from "react";
import axios from "axios";
import config from "../config/config";
import Header from "../components/Header";
import List from "../components/List";

class Home extends Component {
	constructor(props) {
		super(props);

		this.goToVeckor = this.goToVeckor.bind(this);

		this.state = {
			loading: false,
			posts: []
		};

	}
	componentDidMount() {
		axios.get(config.api_url + "/wp-json/wp/v2/posts").then(res => {
			console.log(res);
			// const persons = res.data;
			this.setState({ posts: res.data });
		});
	}

	goToVeckor(id) {
		this.props.history.push("/medarbetare/" + id);

	}

	render() {
	
		let that = this;
		return (
			<div className="Lista-grid">
				<Header history={this.props.history}  />
				<List>
					<div>
						{this.state.posts.map(function(post) {
							console.log(post);
							return (
								<div
									onClick={(e) => that.goToVeckor(post.id,e)}
									
									className="lista-style"
									key={post.id}
								>
									{" "}
									{post.title.rendered}
								</div>
							);
						})}
					</div>
				</List>
			</div>
		);
	}
}

export default Home;
