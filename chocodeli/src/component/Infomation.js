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
           <span>{this.props.Content1} </span>
           </div>
           <div className="col-lg-4">
           <span>{this.props.Content2} </span>
           </div>
           <div className="col-lg-4">
           <span>{this.props.Content3} </span>
           </div>
         </div>
      </div>
      </div>
			)
	}
};
export default Infomation;