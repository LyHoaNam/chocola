import React, {PureComponent} from "react";
import "../../../style/chill.css";
import {Link } from 'react-router-dom';
import {Button} from  "react-bootstrap";
class NextAssoRule extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			min_conf: 0.5,
			min_supf: 0.5,
			tooltipmin_conf: false,
			tooltipmin_supf:false,
			check:false
		}
		this.handleChange=this.handleChange.bind(this);
	}
	handleChange(event) {
		const value= event.target.value;
		const name= event.target.name;
		const tooltipname = 'tooltip'+name;

		if( value>0 && value <=1 ){
			this.setState({[tooltipname]:false,
				check:true});
		}
		else
			this.setState({[tooltipname]:true,
					check:false});
		this.setState({[name]: value});
	}
	componentDidMount () {
    if(sessionStorage.getItem('des')){
      let tempdata= sessionStorage.getItem('des');
      tempdata = JSON.parse(tempdata);
      let row = parseFloat(sessionStorage.getItem('row'))
      let half = parseFloat(tempdata['0']['50%'])
      let tu25 = parseFloat(tempdata['0']['25%'])
      let tu75 = parseFloat(tempdata['0']['75%'])
      let setMinSup = (half/row).toFixed(4)
      let setMinConf = (tu25/tu75).toFixed(4)
      this.setState({min_supf:setMinSup, 
      min_conf:setMinConf,check:true})
    	}

	}
	removeCache(){
  	//remove session datasend (obj = {minsup... min conf...})
  	if (sessionStorage.getItem('datasend'))
  		sessionStorage.removeItem('datasend');
	//remove localStorage fpgrowth
	if(localStorage.getItem('fpgrowth'))
		localStorage.removeItem('fpgrowth');
	//remove localStorage apiori
	if(localStorage.getItem('apiori'))
		localStorage.removeItem('apiori');
	}
	render(){
		return(

			<div className="NextModal">

			<div className="FontTitle">
			Algorthm: 
			{
				this.props.listdata !== null ?
				this.props.listdata.map((algo,index)=>
				{
			//write "," one each algo (alorthm)
					return index ===0 ?
					<span className="fontsmalltitle" key={index}>{" "+algo}</span>:
					<span className="fontsmalltitle" key={index}>{", "+algo}</span>
				}
				): ""
			}
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
							}
						}}>
					Finish
					{
						this.removeCache()
					}
					</Link>
					):'Finish'
			}

				</Button>
				</div>
				</div>
				</div>
		)
	}
}
export default NextAssoRule;