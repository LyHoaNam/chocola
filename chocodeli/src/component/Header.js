import React, { PureComponent } from "react";
import "../style/main.css";
import {Link } from 'react-router-dom';
class Header extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			alg: null,
			active: true
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(algorithm){
		if(algorithm != null)
		{
    		this.props.callbackFromParent(algorithm);
    		this.setState({active: algorithm});
		}

	}

	render() {
		return (
			<nav id="sidebar">
			<div className="logoContainer">
			<img src={require('../img/color-logo.png')} className="LogoInMenu" alt="logo"/>
			</div>

			<div className="ContainRightText">
			<span className="BtnYourData">
			<Link to={'/'}>
			Your Data
			</Link>
			</span>
			</div>
			</nav>
			);
	}
}
export default Header;