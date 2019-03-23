import React, {PureComponent} from "react";
import "../style/chill.css";
import {FormControl,InputGroup,Modal, Button} from  "react-bootstrap";
class NextAlgorthm extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			min_conf: '',
			min_supf: ''
		}
	}
	updateMinCof(e){
		if(e.target.value >0 & e.target.value <1)
			this.setState({min_conf:e.target.value});
	}
	updateMinSup(e){
		if(e.target.value >0 & e.target.value <1)
		this.setState({min_supf:e.target.value});
	}
	render(){
		return(
			<Modal
			{...this.props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			
			>
			<Modal.Header>
			<Modal.Title id="contained-modal-title-vcenter">
			Setting Algorthm
			</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<div>
			<div className="FontTitle">
			Algorthm: {this.props.listdata !== null ?
				this.props.listdata.map((algo,index)=>
				{
					//write "," one each algo (alorthm)
					return index ===0 ?
						<span className="fontsmalltitle" key={index}>{" "+algo}</span>:
					<span className="fontsmalltitle" key={index}>{", "+algo}</span>
				}
				): ""}
			</div>
			<div className="FontTitle">
			Setup
			</div>
			<InputGroup className="mb-3">
			<FormControl
			placeholder="min conf"
			aria-label="min_conf"
			aria-describedby="basic-addon1"
			value={this.state.min_conf}
			onChange={this.updateMinCof}
			/>
			</InputGroup>

			<InputGroup className="mb-3">
			<FormControl
			placeholder="min sup"
			aria-label="min_sup"
			aria-describedby="basic-addon1"
			value={this.state.min_supf}
			onChange={this.updateMinSup}
			/>
			</InputGroup>
			</div>	
			</Modal.Body>
			<Modal.Footer>
			<Button onClick={this.props.onNeHide}
			className="Close">Back</Button>
			<Button className="Next">Finish
			</Button>
			</Modal.Footer>
			</Modal>
			)
	}
}
export default NextAlgorthm;