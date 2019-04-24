import React, { PureComponent } from "react";
import "../style/main.css";
import {Link } from 'react-router-dom';
class Header extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			alg: null,
			activeYD: '',
			activeAc:''
		};
	}

	render() {
		let activeAccount = ()=> this.setState({activeAc:'activebtn',activeYD:''});
		let activeYourData = ()=> this.setState({activeYD:'activebtn',activeAc:''});
		return (
			<nav id="sidebar">
			<div className="logoContainer">
			<Link to={'/'}>
			<img src={require('../img/headerlogonew.png')} className="LogoInMenu" alt="logo"/>
			</Link>
			</div>

			<div className="ContainRightText">
			<span className={"BtnYourData "+this.state.activeYD}
			onChange={activeYourData}>
			<Link to={'/'}>
			Your Data
			</Link>
			</span>
			<span className={"BtnYourData "+this.state.activeAc}
			onChange={activeAccount}>
			<Link to={'/profile'}>
			Account
			</Link>
			</span>
			</div>
			</nav>
			);
	}
}
export default Header;