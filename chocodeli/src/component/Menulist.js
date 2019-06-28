import React, {PureComponent} from "react";
import '../style/chill.css';
import {Link} from 'react-router-dom';
class Menulist extends PureComponent {
  render(){ 
    let Algorthm= this.props.algorthm;
    let linkto=this.props.linkto;
    return (   
    <Link to={linkto}>
     <div className="menu">
     <div className="menuTitle">
     <span>
     Algorithm: 
     </span>
     <span className="nameAlgorithmList">
     {Algorthm}
     </span>
     </div>

     <div className="menuInfo">
     <span>

     </span>
     </div>
     </div>
    </Link>
    


  )
}
}
export default Menulist;