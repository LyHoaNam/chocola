import React, {PureComponent} from "react";
import "../style/chill.css";
import {Link } from 'react-router-dom';
import {Modal, Button} from  "react-bootstrap";
class NextAssoRule extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			min_conf: '',
			min_supf: '',
			min_len:'',
			tooltipmin_conf: false,
			tooltipmin_supf:false,
			tooltipmin_len:false,
			check:false
		}
		this.handleChange=this.handleChange.bind(this);
		this.handleChangelen=this.handleChangelen.bind(this);
	}
  handleChange(event) {
  	const value= event.target.value;
  	const name= event.target.name;
  	const tooltipname = 'tooltip'+name;

  	if( value>0 && value <=1 )
  		{
  			this.setState({[tooltipname]:false,
  				check:true});}
  	else
  		this.setState({[tooltipname]:true,
  			check:false});
  	this.setState({[name]: value});
  }
  handleChangelen(event){
  	 const value= event.target.value;
  	if( value >= 1){
  			this.setState({tooltipmin_len:false,
  				check:true});}
  	else
  		this.setState({tooltipmin_len:true,
  			check:false});
  	this.setState({min_len: value});
  }
    removeCache(){
  	//remove session datasend (obj = {minsup... min conf...})
  	sessionStorage.getItem('datasend') ?
				sessionStorage.removeItem('datasend'): "";
				//remove localStorage fpgrowth
				localStorage.getItem('fpgrowth')?
				localStorage.removeItem('fpgrowth'): "";
				//remove localStorage apiori
				localStorage.getItem('apiori')?
				localStorage.removeItem('apiori'): "";
  }
	render(){
		return(

			<div className="NextModal">

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


			<div className="InputGroup">
			<input type="text" 
			value={this.state.min_supf} 
			name='min_supf'
			placeholder="Enter min sup"
			className="Inputfields"
			onChange={this.handleChange} />
			<div className="tooltipNoti">
			<span className={!this.state.tooltipmin_supf ? 
				"tooltiptext":
				"tooltipActive"}>
			{'0<min supf<1'}
			</span>
			</div>
			</div>

			<div className="InputGroup">
			<input type="text" 
			value={this.state.min_conf}
			name='min_conf' 
			placeholder="Enter min conf"
			className="Inputfields"
			onChange={this.handleChange} />
			<div className="tooltipNoti">
			<span className={!this.state.tooltipmin_conf ? 
				"tooltiptext":
				"tooltipActive"}>
			{'0<min conf<1'}
			</span>
			</div>
			</div>

			<div className="InputGroup">
			<input type="text" 
			value={this.state.min_len}
			name='min_len' 
			placeholder="Enter min len"
			className="Inputfields"
			onChange={this.handleChangelen} />
			<div className="tooltipNoti">
			<span className={!this.state.tooltipmin_len ? 
				"tooltiptext":
				"tooltipActive"}>
			{'min len>1'}
			</span>
			</div>
			</div>

			<div className="ModalFooter">
			<div className="ContainBtnBox">
			<span className="paddingRight15">
			<Button 
			onClick={this.props.onNeHide}
			className="Close">Back</Button>
			 </span>
			<Button className="Next">
			{
				 this.state.check ? ( 
				<Link to={{
				pathname:'/algorthm/'+this.props.listdata[0],
				datasend: {
					ChooseAl:this.props.listdata,
					min_supf:this.state.min_supf,
					min_conf:this.state.min_conf,
					min_len:this.state.min_len }
			}}>
			Finish
			{
				this.removeCache()
			}
			</Link>
			):
				'Finish'	}

			</Button>
			</div>
			</div>
			</div>
			

			)
	}
}
export default NextAssoRule;