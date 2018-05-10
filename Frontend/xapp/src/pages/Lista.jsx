import React, { Component } from "react";
import Header from "../components/Header";
import Anstallda from "../components/Anstallda";
import Footer from "../components/Footer";
import Projects from "../components/Projects";
import ProjectName from "../components/ProjectName";
import axios from "axios";
// class Medarbetare2 extends Component {
// 	constructor(props) {
// 		super(props);
// 	}
// 	toggleHidden () {
//     this.setState({
//       isHidden: !this.state.isHidden
//     })
//   }

class Lista extends Component {
	constructor(props) {
		super(props);

		this.goToMedarbetare = this.goToMedarbetare.bind(this);

		this.state = {
			loading: false,
			medarbetare: [],
			kitchen: ""
		};
	}
	componentDidMount() {
		//console.log(this.props.match.params.slug);
		// get ajax
		let that = this;

		axios
			.get("http://xapp.tst/wp-json/wp/v2/acf/options", {
				headers: {
					"content-type": "application/json"
				}
			})
			.then(function(res) {
				let medarbetare = res.data.medarbetare;
				console.log();
				that.setState({ medarbetare: medarbetare });
				that.setState({ kitchen: res.data.current });

				// let medarbetare_bild = res.data.medarbetare_bild;
				// that.setState({ medarbetare_bild: medarbetare_bild});
				// console.log(medarbetare_bild);

				// let medarbetare_titel = res.data.medarbetare_titel;
				// that.setState({ medarbetare_titel: medarbetare_titel});
				// setter
				//localStorage.setItem('medarbetare_titel', medarbetare_titel);

				// getter

				//console.log(medarbetare);
				// const persons = res.data;
			});
	}
	goToMedarbetare(medarbetare_id, bild, e) {
		let url = this.props.history.location;

		url = url.pathname + "/" + medarbetare_id;

		this.props.history.push(url);

		localStorage.setItem("medarbetare_titel", bild);
	}
	render() {
		let that = this;
		return (
			<div className="Medarbetare-grid">
				<Header history={this.props.history} />
				<Anstallda>
					{this.state.medarbetare.map(function(post) {
						//console.log(post);
						return (
							<div
								className="card"
								key={post.medarbetare_id}
								onClick={e =>
									that.goToMedarbetare(
										post.medarbetare_id,
										post.medarbetare_bild,
										e
									)
								}
							>
								<div className="container2">
									<h3>{post.medarbetare_name}</h3>
									<img
										src={post.medarbetare_bild}
										alt=""
										className="medarbetare_bild"
									/>
									<h4>{post.medarbetare_titel}</h4>
								</div>
							</div>
						);
					})}
				</Anstallda>
				<Footer>
					<div className="kitchen">{this.state.kitchen}</div>
				</Footer>
			</div>
		);
	}
}

export default Lista;