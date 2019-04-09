import React, {PureComponent} from "react";
import "../style/chill.css";

class Predit extends PureComponent {
	render(){
		return(
		<div id="content">
      <Infomation Content1={"Algorthm: Fpgrowth"}
      Content2={"min support: "+ this.state.min_len}
      Content3={"min confident: "+this.state.min_conf}/>
     
    
      </div>
			)
	}
}
export default Predit;