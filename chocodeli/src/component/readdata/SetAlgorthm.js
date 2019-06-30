import React, {PureComponent} from "react";
import "../../style/chill.css";
import {Modal, Button} from "react-bootstrap";
import ChooseColRule from "./next/ChooseColRule";
import NextPredit from "./next/NextPredit";
import NextClustering from "./next/NextClustering";
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
			nmf:false,
			slopeone:false,
			showPredic: 'displayNone',
			kmeans:false,
			showClustering:'displayNone',
			authorization: null,
			clusterPoint: '',
			preditPoint: '',
			arrType: [],
			display: 'displayBlock'
		}
		this.ReadyToNext = this.ReadyToNext.bind(this);
		this.modalNeClose = this.modalNeClose.bind(this);
		this.closeNextBox = this.closeNextBox.bind(this);
	} 
	componentDidMount () {
		
		if(this.props.type){
			let checkType = JSON.parse(this.props.type);
			if (checkType['float64'] + checkType['int64'] < 2){
				this.setState({clusterPoint:'PointerEventNone'});
			}
			else{
				let author=localStorage.getItem('Auth');
				this.setState({authorization:author});
				this.getData(author);
			}
			if (checkType['float64'] + checkType['int64'] < 3){
				this.setState({preditPoint:'PointerEventNone'});
			}
			
		}
	}
	getData(bearer,page) {
			//ready to fetch data
			let url= '/data/types';
			let options = {
				method: 'GET',
				headers: {
					'Authorization': bearer
				}
			}
			fetch(url,options)
			.then(res=>res.json())
			.then(res=>
			{
				this.setState({arrType:res['types']})
				
			}
			)
			.catch(e=>{
				//window.location.href="/login";
			});   

		}
	ReadyToNext() {
		let Datatonext = [];	
		let Count =0;
		if(this.state.Apyori)
		{
			Datatonext.push("apiori");
			this.setState({neAsShow:'AssociationRule'});
			Count++;
		}
		if(this.state.fpgrowth){
			Datatonext.push("fpgrowth");
			this.setState({neAsShow:'AssociationRule'});
			Count++;
		}
		if(this.state.knn){
			Datatonext.push("knn");
			this.setState({neAsShow:'Prediction'});
			Count++;
		}
		if(this.state.kmeans){
			Datatonext.push("kmeans");
			this.setState({neAsShow:'Clustering'});
			Count++;
		}
		if(this.state.nmf){
			Datatonext.push("nmf");
			this.setState({neAsShow:'Prediction'});
			Count++;
		}
		if(this.state.slopeone){
			Datatonext.push("slopeone");
			this.setState({neAsShow:'Prediction'});
			Count++;
		}
		if(Count>0){
		this.setState({Datatonext:Datatonext,display:'displayNone'});
		}
	}
	closeNextBox(){
		this.setState({display: 'displayBlock',neAsShow:false})
	}
	writeNextBox(){
		let category = this.state.neAsShow;
		switch(category){
			case 'AssociationRule':
			return <ChooseColRule
				listdata={this.state.Datatonext}
				column={this.props.column}
				onNeHide={this.closeNextBox}/>;
			case 'Prediction':
			return <NextPredit 
				listdata={this.state.Datatonext}
				column={this.props.column}
				type={this.state.arrType}
				onNeHide={this.closeNextBox}/>;
			case 'Clustering':
			return <NextClustering 
				listdata={this.state.Datatonext}
				column={this.props.column}
				type={this.state.arrType}
				onNeHide={this.closeNextBox}/>;
			default:
				return false;
		}
	}
	modalNeClose(){
		//hide box next assosion rule
		this.setState({neAsShow:false});}
	render(){
		let showNextBox = this.writeNextBox() !==false? this.writeNextBox():""
		let ShowAssoRule = ()=> this.setState({showRule:"displayBlock",
			Apyori:true, fpgrowth:true,knn:false,showPredic:'displayNone',
			showClustering:'displayNone',kmeans:false,nmf:false,slopeone:false});
		let ShowPredic = ()=> {this.setState({knn:true,showPredic:"displayBlock",
			Apyori:false, fpgrowth:false, showClustering:'displayNone',
			showRule:'displayNone',kmeans:false,nmf:true,slopeone:true})}
		let ShowClustering= ()=> {this.setState({kmeans:true,showClustering:'displayBlock',
			showRule:'displayNone',showPredic:'displayNone',knn:false,nmf:false
			,Apyori:false,fpgrowth:false,slopeone:false})}
		let showApiori = ()=>this.setState({Apyori:!this.state.Apyori});
		let showFpgrowth = ()=>this.setState({fpgrowth:!this.state.fpgrowth});
		let showKnn = ()=>this.setState({knn:!this.state.knn});
		let showNmf = ()=>this.setState({nmf:!this.state.nmf});
		let showSlopeOne = ()=>this.setState({slopeone:!this.state.slopeone});
		let showkmean=()=> this.setState({kmeans:!this.state.kmeans});
		return (
			<div>
			<Modal
			{...this.props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter">

			<Modal.Body>
			<div className={this.state.display}>
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

			<label className={"containerRadio "+this.state.clusterPoint}
			onChange={ShowClustering}>
			Clustering algorithms
			<input type="radio"  name="radio"/>
			<span className="checkmarkdot"></span>
			</label>

			<div className={"ContainCheckbox " +this.state.showClustering}>
				<label className="Btncontainer">k-means
				<input type="Checkbox"  
				name="kmeans" 
				checked={this.state.kmeans}
				onChange={showkmean} />
				<span className="checkmark"></span>
				</label>
			</div>

			<label className={"containerRadio "+this.state.preditPoint}
			onChange={ShowPredic}>
			Prediction algorithms
			<input type="radio"  name="radio"/>
			<span className="checkmarkdot"></span>
			</label>

			<div className={"ContainCheckbox " +this.state.showPredic}>
				<label className="Btncontainer">k-NN (nearest neighbors approach)
				<input type="Checkbox"  
				name="knn" 
				checked={this.state.knn}
				onChange={showKnn} />
				<span className="checkmark"></span>
				</label>
				<label className="Btncontainer">NMF (A collaborative filtering algorithm 
					based on Non-negative Matrix Factorization)
				<input type="Checkbox"  
				name="nmf" 
				checked={this.state.nmf}
				onChange={showNmf} />
				<span className="checkmark"></span>
				</label>
				<label className="Btncontainer">SlopeOne (A simple yet accurate collaborative filtering algorithm.)
				<input type="Checkbox"  
				name="slopeone" 
				checked={this.state.slopeone}
				onChange={showSlopeOne} />
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
			</div>
			{
				showNextBox
			}
			
			</Modal.Body>

			</Modal>
			</div>
			)
	}
}
export default SetAlgorthm;