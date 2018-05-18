import React, { Component } from "react";


class Asside2 extends Component {

	render() {
		
		return (
			<div className={"Asside"}>

				<div className="Asside-container2">
					
					
						{this.props.children}
						
					
				</div>
			</div>
		);
	}
}

export default Asside2;
