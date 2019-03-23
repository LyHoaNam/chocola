import React, {PureComponent} from "react";
import "../style/chill.css";
import {Modal, Button} from "react-bootstrap";
import NextAlgorthm from "./NextAlgorthm";
class SetAlgorthm extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			Datatonext:null,
			Apyori: false,
			fpgrowth:false,
			neShow:false
		}
		this.ReadyToNext = this.ReadyToNext.bind(this);
	}
	ReadyToNext() {
		let Datatonext = [];
		let Count=0;
		if(this.state.Apyori)
		{
			Datatonext.push("Apyori");
			Count++;
		}
		if(this.state.fpgrowth){
			Datatonext.push("Fpgrowth");
			Count++;
		}
		if(Count>0){
		this.setState({Datatonext:Datatonext});
		this.setState({neShow:true});

		}
		
	}
	render(){
		let modalNeClose = ()=>this.setState({neShow:false});
		let ShowAssoRule = ()=> this.setState({showRule:"displayBlock",Apyori:true, fpgrowth:true});
		let CheckApyori = ()=>this.setState({Apyori:!this.state.Apyori});
		let CheckFpgrowth = ()=>this.setState({fpgrowth:!this.state.fpgrowth});
		
		return (
			<div>
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
			<div className="FontTitle">
			Choose Algorthm
			</div>
			<div>
			<label className="containerRadio"
			onChange={ShowAssoRule}>Association rules
			<input type="radio"  name="radio"/>
			<span className="checkmarkdot"></span>
			</label>
			<div className={"ContainCheckbox " +this.state.showRule}>
				<label className="Btncontainer"
				onChange={CheckApyori}>Apyori
				<input type="checkbox"  name="apyori" checked=
				{this.state.Apyori} />
				<span className="checkmark"></span>
				</label>
				<label className="Btncontainer"
				onChange={CheckFpgrowth}>Fpgrowth
				<input type="checkbox"  name="fpgrowth" checked=
				{this.state.fpgrowth}/>
				<span className="checkmark"></span>
				</label>
			</div>
			</div>
			</Modal.Body>
			<Modal.Footer>
			<Button onClick={this.props.onHide}
			className="Close">Close</Button>
			<Button className="Next"
			onClick={this.ReadyToNext}>Next
			</Button>
			</Modal.Footer>
			</Modal>
			<NextAlgorthm show={this.state.neShow} 
			onNeHide={modalNeClose}
			listdata={this.state.Datatonext}/>
			</div>
			)
	}
}
export default SetAlgorthm;