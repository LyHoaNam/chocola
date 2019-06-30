import React, {PureComponent} from "react";
import '../style/chill.css';
import {NavLink} from 'react-router-dom';
class Menulist extends PureComponent {
  render(){ 
    let Algorthm= this.props.algorthm;
    let linkto=this.props.linkto;
    let isActive = (path, match, location) => 
    !!(match || path === location.pathname);
    return (   
    <NavLink to={linkto}
    exact={true}
    className="menu"
     activeStyle={{
                  backgroundColor: '#0D84E8',
                  color: '#ffff'
                }}
        isActive={isActive.bind(this, '/my/path')}>

     <span className="menuTitle">
     Algorithm: 
     </span>
     <span className="nameAlgorithmList">
     {Algorthm}
     </span>
    </NavLink>
    


  )
}
}
export default Menulist;