import React, { Component } from "react";

class List extends Component {


	render() {
		return (
			<div className="List">
				{this.props.children}
			</div>
		);
	}
}

export default List;
