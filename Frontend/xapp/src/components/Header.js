import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
	constructor(props) {
		super(props);
	  	
  this.goToHem = this.goToHem.bind(this);

  }

 goToHem() {
 	console.log(1);
		this.props.history.push("/");
		
		
		//this.context.history.push('/path')

	}


	render() {
		return (

			<div className={"Header"}>
				<Link className="btn" to="/">
					<h3>Hem</h3>
				</Link>
				<Link className="btn" to="Lista">
					<h3>Lista</h3>
				</Link>
				<Link className="btn" to="Medarbetare">
					<h3>Medarbetare</h3>
				</Link>
				
				<img src="/img/Guts&Glory_VIT.svg" onClick={(e) => this.goToHem()} alt="" className="tes"/>
				
			</div>
		);
	}
}

export default Header;
