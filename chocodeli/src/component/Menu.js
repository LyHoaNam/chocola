import React, { PureComponent } from "react";
import "../style/main.css";

class Menu extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			alg: null
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(algorithm){
		if(algorithm != null)
		{
    		this.props.callbackFromParent(algorithm);		
		}

	}

	render() {
		return (
			<nav id="sidebar">
			<div className="sidebar-header">
			<strong>Algorthm</strong>
			</div>

			<ul className="list-unstyled components">

			<li>
			<p className="titleFilters"
			onClick={()=>this.handleClick('fpgrowth') }>fpgrowth</p>

			<hr/>
			</li>
			<li>
			<p className="titleFilters"
			onClick={()=>this.handleClick('apiori') }>apiori</p>
			<hr/>
			</li>
			<li>
			<p className="titleFilters"
			onClick={()=>this.handleClick('product') }>product</p>
			<hr/>
			</li>
			</ul>

			</nav>
			);
	}
}
export default Menu;