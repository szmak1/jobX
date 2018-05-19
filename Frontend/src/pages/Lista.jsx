import React, { Component } from "react";
import Header from "../components/Header";
import Asside2 from "../components/Asside2";
import Anstallda from "../components/Anstallda";
import config from "../config/config";
import Footer from "../components/Footer";
import axios from "axios";

class Lista extends Component {
	constructor(props) {
		super(props);

		this.goToMedarbetare = this.goToMedarbetare.bind(this);

		this.state = {
			loading: false,
			medarbetare: [],
			kitchen: "",
			new_user_list: [],
			projekt_list: []
		};
	}

	componentDidMount() {
		//console.log(this.props.match.params.slug);
		// get ajax
		let that = this;

		axios
			.get(config.api_url + "/wp-json/wp/v2/acf/options", {
				headers: {
					"content-type": "application/json"
				}
			})
			.then(function(res) {
				let medarbetare = res.data.medarbetare;
				console.log();
				that.setState({ medarbetare: medarbetare });
				that.setState({ kitchen: res.data.current });
			});

		let new_user_list = [];
		axios
			.get(
				config.api_url +
					"/wp-json/wp/v2/posts/" +
					this.props.match.params.slug
			)
			.then(res => {
				let arry = res.data.acf.projekt;

				for (var i = arry.length - 1; i >= 0; i--) {
					for (var j = arry[i].timmar.length - 1; j >= 0; j--) {
						let obj = arry[i].timmar[j];

						Object.keys(obj).forEach(function(key) {
							//let new_ob = obj[key];

							if (Array.isArray(obj[key])) {
								for (var x = obj[key].length - 1; x >= 0; x--) {
									if (
										Array.isArray(
											new_user_list[arry[i].project_namn]
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
											new_user_list[arry[i].project_namn][
												key
											] = [];
										}
									}

									new_user_list[arry[i].project_namn][
										key
									] = +obj[key][x].timmar;

									new_user_list[arry[i].project_namn][
										"status"
									] =
										arry[i]["project_status"];
									new_user_list[arry[i].project_namn]["nr"] =
										arry[i]["project_nr"];
								}
							}
						});
					}
				}

				this.setState({ projekt_list: new_user_list });
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
			<div className="Medarbetare-grid2">
				<Header history={this.props.history} />
				<Asside2>
					<div className="allaProjektos">
						<h5>Alla Projekt</h5>
					</div>
					<div className="projekt_list">
						{Object.keys(this.state.projekt_list).map(function(
							key
						) {
							return (
								<div className="asside2Background">
									<h4 key={key} className="AssidePro">
										{" "}
										{key} -{" "}
										{that.state.projekt_list[key]["nr"]}{" "}
									</h4>
									<p className="statusAsside">
										{" "}
										{
											that.state.projekt_list[key][
												"status"
											]
										}{" "}
									</p>
									<p className="weekAsside">
										<div>
											<div className="mondayM">
												{"Måndag"}
											</div>
											<div calssName="mondayH">
												{
													that.state.projekt_list[
														key
													]["m"]
												}
												{""}
											</div>
										</div>
										<div>
											<div>{"Tisdag"}</div>
											<div>
												{
													that.state.projekt_list[
														key
													]["t"]
												}
												{""}
											</div>
										</div>
										<div>
											<div>{"Onsdag"}</div>
											<div>
												{
													that.state.projekt_list[
														key
													]["o"]
												}
												{""}
											</div>
										</div>
										<div>
											<div>{"Torsdag"}</div>
											<div>
												{
													that.state.projekt_list[
														key
													]["th"]
												}
												{""}
											</div>
										</div>
										<div>
											<div>{"Fredag"}</div>
											<div>
												{
													that.state.projekt_list[
														key
													]["f"]
												}
												{""}
											</div>
										</div>
									</p>
								</div>
							);
						})}
					</div>
				</Asside2>
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
					<div className="kitchenHeader">
						<h5>Köksvecka</h5>
					</div>
					<div className="kitchen">{this.state.kitchen}</div>
				</Footer>
			</div>
		);
	}
}

export default Lista;
