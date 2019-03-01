import React, { PureComponent } from "react";
import "../style/main.css";

import PropTypes from "prop-types";
class Header extends PureComponent {

	  handleChange = event => {
	    this.props.textChange(event);
  };
  render() {
    return (
<nav className="navbar navbar-light bg-light">
		<div className="leftnav">
			<button className="pad10 btnsidebar"  id="clickmenu"> 
				<i className="fas fa-bars purplecolor menunav"></i>	
				</button>	
			<span>
				<strong>MENU</strong>
			</span>
			
		</div>
		<div className="centernav">
			 <div className="input-group stylish-input-group">
                    <input type="text" className="form-control"  placeholder="Search" 
                    onChange={this.handleChange}/>
                </div>
		</div>

	</nav>
    );
  }
}
Header.propTypes ={
	textChange: PropTypes.func
};
export default Header;
