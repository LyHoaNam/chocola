import React, {PureComponent} from "react";
import '../style/chill.css';
import {Link} from 'react-router-dom';
class Menulist extends PureComponent {
  render(){ 
    let Algorthm= this.props.algorthm;
    let min_conf= this.props.min_conf;
    let min_supf=this.props.min_supf;
    let min_len=this.props.min_len;
    return (   
    <Link to={'/algorthm/'+Algorthm}>
     <div className="menu">
     <div className="menuTitle">
     <span>
     Algorthm: {Algorthm}
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