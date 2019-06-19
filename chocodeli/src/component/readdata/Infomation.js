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
           <div className="displayGird">
           <span className="infoAcName">
           Data file name: 
           </span>
           <span>
            {this.props.Content1}
            </span>
            </div>
           <div>
            <span className="infoAcName">
            Row:
            </span>
            <span>
            {this.props.Shape[0]}
            </span>
            </div>
           <div>
           <span className="infoAcName">
           Column: 
           </span>
           <span>
           {this.props.Shape[1]}
          </span>
           </div>
      </div>
      </div>
			)
	}
};
export default Infomation;