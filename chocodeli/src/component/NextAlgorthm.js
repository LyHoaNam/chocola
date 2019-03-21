import React, {PureComponent} from "react";
import "../style/chill.css";
import {FormControl,InputGroup} from  "react-bootstrap";
class NextAlgorthm extends PureComponent {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
				<div className="ButtonMenu">
					Algorthm: 
					<span className="listAlgorthm">
					</span>
				</div>
				<div className="ButtonMenu">
				Setup
				</div>
				  <InputGroup className="mb-3">
    <FormControl
      placeholder="min conf"
      aria-label="min_conf"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

				  <InputGroup className="mb-3">
    <FormControl
      placeholder="min sup"
      aria-label="min_sup"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
			</div>	
			)
	}
}
export default NextAlgorthm;