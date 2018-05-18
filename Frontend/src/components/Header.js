import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {


	render() {
		return (
			<div className={"Header"}>
				<Link className="testtt" to="/">
					<img src="/img/Guts&Glory_VIT.svg" alt="" className="tes" />
				</Link>
			</div>
		);
	}
}

export default Header;
