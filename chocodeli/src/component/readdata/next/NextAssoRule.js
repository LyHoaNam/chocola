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
			check:true,
			arrIndex:[]
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
	getRuleData(bearer) {
      //ready to fetch data
      let url= '/rule/col_des';
      
      let columnSelected = this.props.column;
      let formdata = "{\"sel_col\":\""+
      			columnSelected
					+"\"}";
      let options = {
        method: 'POST',
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'
        },
        body: formdata
      }

      fetch(url,options)
      .then(res=>res.json())
      .then(res=>
      {
      	if(res.des)
      	{
      		sessionStorage.setItem('des',res.des);
      	        this.setState({min_supf:res.minsup,
      	        	min_conf:res.minconf,
      	        	strCol:columnSelected});
      	 }
      }
      )
      .catch(e=>{
        //window.location.href="/login";
      });   

    }
	componentDidMount () {
	let author=localStorage.getItem('Auth');
	this.getRuleData(author);
	if(this.props.nameColumn.length>0){
		sessionStorage.setItem('nameCol',
			JSON.stringify(this.props.nameColumn));}
	}
	removeCache(){
  	//remove session datasend (obj = {minsup... min conf...})
  	if (sessionStorage.getItem('datasend'))
  		sessionStorage.removeItem('datasend');
  	
	if(localStorage.getItem('apiori'))
		localStorage.removeItem('apiori');
	//remove localStorage fpgrowth
	if(localStorage.getItem('fpgrowth'))
		localStorage.removeItem('fpgrowth');
	//remove localStorage apiori
	if(localStorage.getItem('usercol'))
		localStorage.removeItem('usercol');
	if(localStorage.getItem('itemcol'))
		localStorage.removeItem('itemcol');
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
			onClick={this.props.onNeAsHide}
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
							str_col:this.state.strCol

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