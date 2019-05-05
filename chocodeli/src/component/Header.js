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
			<img src={require('../img/headerlogonew.png')} className="LogoInMenu" alt="logo"/>
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
			<Link to={'/profile'}
			className={this.state.activeAc}>
			Account
			</Link>
			</span>
			</div>
			</nav>
			);
	}
}
export default Header;