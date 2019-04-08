import React, {PureComponent} from "react";
import "../style/chill.css";
import {Modal, Button} from "react-bootstrap";
import NextAlgorthm from "./NextAlgorthm";
import NextAssoRule from "./NextAssoRule";
import NextPredit from "./NextPredit";
class SetAlgorthm extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			Datatonext:null,
			Apyori: false,
			fpgrowth:false,
			neAsShow:false,
			showRule: 'displayNone',
			knn:false,
			showPredic: 'displayNone'
		}
		this.ReadyToNext = this.ReadyToNext.bind(this);
	}
	ReadyToNext() {
		let Datatonext = [];
		let Count=0;
		if(this.state.Apyori)
		{
			Datatonext.push("apiori");
			Count++;
		}
		if(this.state.fpgrowth){
			Datatonext.push("fpgrowth");
			Count++;
		}
		if(this.state.knn){
			Datatonext.push("knn");
			Count++;
		}
		if(Count>0){
		this.setState({Datatonext:Datatonext});
		this.setState({neAsShow:true});

		}
		
	}

	render(){
		let modalNeClose = ()=>{this.setState({neAsShow:false});}
		let ShowAssoRule = ()=> this.setState({showRule:"displayBlock",
			Apyori:true, fpgrowth:true,knn:false});
		let ShowPredic = ()=> {this.setState({knn:true,showPredic:"displayBlock",
			Apyori:false, fpgrowth:false})}
		let showApiori = ()=>this.setState({Apyori:!this.state.Apyori});
		let showFpgrowth = ()=>this.setState({fpgrowth:!this.state.fpgrowth});
		let showKnn = ()=>this.setState({knn:!this.state.knn});
		return (
			<div>
			<Modal
			{...this.props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter">

			<Modal.Body>
			<h3>Setting Algorthm</h3>
			<div className="FontTitle">
			Choose Algorthm
			</div>
			<div>
			{// Name of Algorthm
			}
			<label className="containerRadio"
			onChange={ShowAssoRule}>
			Association rules
			<input type="radio"  name="radio"/>
			<span className="checkmarkdot"></span>
			</label>

			<div className={"ContainCheckbox " +this.state.showRule}>
				<label className="Btncontainer">Apyori
				<input type="Checkbox"  
				name="Apyori" 
				checked={this.state.Apyori}
				onChange={showApiori} />
				<span className="checkmark"></span>
				</label>
				<label className="Btncontainer">
				Fpgrowth
				<input type="Checkbox"  
				name="fpgrowth" 
				checked={this.state.fpgrowth}
				onChange={showFpgrowth}/>
				<span className="checkmark"></span>
				</label>
			</div>

			<label className="containerRadio"
			onChange={ShowPredic}>
			Prediction algorithms
			<input type="radio"  name="radio"/>
			<span className="checkmarkdot"></span>
			</label>

			<div className={"ContainCheckbox " +this.state.showPredic}>
				<label className="Btncontainer">k-NN (nearest neighbors approach)
				<input type="Checkbox"  
				name="Apyori" 
				checked={this.state.knn}
				onChange={showKnn} />
				<span className="checkmark"></span>
				</label>
			</div>

			</div>
			<div className="ModalFooter">
			<div className="ContainBtnBox">
			<span className="paddingRight15">
			<Button onClick={this.props.onHide}
			className="Close">Close</Button>
			</span>
			<Button className="Next"
			onClick={this.ReadyToNext}>Next
			</Button>
			</div>
			</div>
			{
				this.state.neAsShow?
				<NextAssoRule
				listdata={this.state.Datatonext}
				onNeHide={modalNeClose}/>: ""
			}
			
			</Modal.Body>

			</Modal>
			</div>
			)
	}
}
export default SetAlgorthm;