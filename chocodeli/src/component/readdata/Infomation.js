import React, {PureComponent} from "react";
import "../../style/main.css";
class Infomation extends PureComponent {
	render(){
		return (
		<div className="">
       <div className="Infomation">
          <div className="DetailInfo">
          Infomation
           </div>
           <div>
           {"Data file name: "
            + this.props.Content1} </div>
           <div>{
            "Row: "
            + this.props.Shape[0]} </div>
           <div>{
            "Column: "
            +this.props.Shape[1]} </div>
      </div>
      </div>
			)
	}
};
export default Infomation;