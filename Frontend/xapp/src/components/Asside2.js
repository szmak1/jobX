import React, { Component } from "react";
import { Link } from "react-router-dom";


class Asside2 extends Component {
	constructor(props) {
		super(props);
		
		
	}


	render() {
		
		return (
			<div className={"Asside"}>

				<div className="Asside-container">
					
					
						{this.props.children}
						
					
				</div>
			</div>
		);
	}
}

export default Asside2;
