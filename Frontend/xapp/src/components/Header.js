import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={"Header"}>
				<Link className="btn" to="/">
					<img src="/img/Guts&Glory_VIT.svg" alt="" className="tes" />
				</Link>
			</div>
		);
	}
}

export default Header;
