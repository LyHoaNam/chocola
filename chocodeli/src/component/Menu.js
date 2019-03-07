import React, { PureComponent } from "react";
import "../style/main.css";
import {Link } from 'react-router-dom';
class Menu extends PureComponent {
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

			<div className="ListMenu">
			<div className="ButtonMenu">
			<Link to={'/readdata'}>Your data</Link>
			</div>
			<div className="sidebar-header">
			<strong>Algorthm</strong>
			</div>
			<div className="containList">
			<div className="ButtonMenu">
			Association rules
			</div>
			<ul className="list-unstyled padleft-10">
			<li>
			<Link to={'/'} className= {
				this.state.active==="fpgrowth" ? "ActiveButton titleFilters":
			 " titleFilters"}
			onClick={()=>this.handleClick('fpgrowth') }>fpgrowth</Link>

			</li>
			<li>
			<Link to={'/'} className={
				this.state.active==="apiori" ? "ActiveButton titleFilters":
			 " titleFilters"}
			onClick={()=>this.handleClick('apiori') }>apiori</Link>
			</li>
			<li>
			<p className={
				this.state.active==="product" ? "ActiveButton titleFilters":
			 " titleFilters"}
			onClick={()=>this.handleClick('product') }>product</p>
			</li>
			</ul>
			</div>
			</div>
			</nav>
			);
	}
}
export default Menu;