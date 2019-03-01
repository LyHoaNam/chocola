import React, { PureComponent } from "react";
import "../style/main.css";

class Purpleheader extends PureComponent {
	constructor(props) {
		super(props);
	};

  render() {
    return (
<nav className="navbar purplebg">
		<div className="leftpurplenav">
			<strong className="titlenavpur">algorithm:</strong>
			<span>{this.props.algorithm}</span>
			<strong className="titlenavpur padleft50">min support:</strong>
			<span>{this.props.min_sup}</span>
			<strong className="titlenavpur padleft50">min confindent:</strong>
			<span>{this.props.min_conf}</span>
		</div>

	</nav>
    );
  }
}
export default Purpleheader;
