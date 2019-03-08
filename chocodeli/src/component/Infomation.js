import React, {PureComponent} from "react";
import "../style/main.css";
class Infomation extends PureComponent {
	render(){
		return (
		<div className="col-lg-12 ">
       <div className="Infomation">
          <div className="DetailInfo">
          Infomation
           </div>
         <div className="row">
           <div className="col-lg-4">
           <span>Algorthm: </span>
           </div>
           <div className="col-lg-4">
           <span>Min_Sup </span>
           </div>
         </div>
      </div>
      </div>
			)
	}
};
export default Infomation;