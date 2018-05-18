import React, { Component } from "react";

class Anstallda extends Component {

	render() {
		return (
			<div className="anstallda">
			<div className="wrapThemNow">
				{this.props.children}
			</div>
			</div>
		);
	}
}

export default Anstallda;
