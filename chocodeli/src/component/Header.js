import React, { PureComponent } from "react";
import "../style/main.css";
import {Link } from 'react-router-dom';
class Header extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			alg: null,
			activeYD: 'unactivebtn',
			activeAc:'unactivebtn'
		};
		this.LogOutAccout = this.LogOutAccout.bind(this);
	}
	LogOutAccout(){
		//this function will delete all session and localstorage
		localStorage.clear();
		sessionStorage.clear();
		window.location.href="/login";

	}
	writeButton(){
		if(sessionStorage.getItem('datasend')) {
			let tempdata=sessionStorage.getItem('datasend');
			tempdata=JSON.parse(tempdata);
			let linkto= tempdata.ChooseAl[0];
			return <span  className="BtnYourData">
			<Link to={'/algorthm/'+linkto} className="unactivebtn">
			Your algorthm
			</Link>
			</span>
		}
		return ''
	}
	render() {
		let activeAccount = ()=> this.setState({activeAc:'activebtn',activeYD:'unactivebtn'});
		let activeYourData = ()=> this.setState({activeYD:'activebtn',activeAc:'unactivebtn'});
		let btnAlg = this.writeButton();
		return (
			<nav id="sidebar">
			<div className="logoContainer">
			<Link to={'/'}>
			<img src={require('../img/headerlogonew.png')} 
			className="LogoInMenu" alt="logo"/>
			</Link>
			</div>

			<div className="ContainRightText">
			{btnAlg}
			<span className="BtnYourData "
			onChange={activeYourData}>
			<Link to={'/'}
			className={this.state.activeYD}>
			Your Data
			</Link>
			</span>
			<span className="BtnYourData" 
			onChange={activeAccount}>
			<span className="dropdownAccount">
			<Link to={'/profile'}
			className={this.state.activeAc}>
			Account
			</Link>
			</span>
			<ul className="dd-menuAc">
			<li className="containInfoAc">
			
				<span className="containImgAc">
				<img src={require('../img/logonew.png')} 
				className="imgAc" 
				alt=""/>
				</span>
				<span className="conatinDetailInfo">
				<span className="infoAcName">
				Name of Account
				</span>
				<br />
				<span className="infoAc">
				InfoAccount@gmail.com
				</span>
				</span>

			</li>
			<li className="divider">
			</li>
			<li>
			<Link to={'/profile'}>
			Profile
			</Link>
			</li>
			<li>Help</li>
			<li className="divider">
			</li>
			<li onClick={this.LogOutAccout}>
			<Link to={'/login'}>
			<img src={require('../img/logout.png')}
			className="imgLogout"
			alt=""/>
			Sign Out
			</Link>
			</li>
			</ul>
			</span>
			</div>
			</nav>
			);
	}
}
export default Header;