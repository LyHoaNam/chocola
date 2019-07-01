import React, {PureComponent} from "react";
import "./predit.css";
import {Table} from "react-bootstrap";
import ValueChart from "./ValueChart";
import PrintButton from "../PrintButton";
class Rating extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			selectuser:this.props.selectUser,
			selectitem:this.props.selectItem,
			coluser:this.props.colUser,
			colitem:this.props.colItem,
			colrating:this.props.colRating,
			rating:false,
			valueChart: null,
			time:null,
			resultBtn :''
		}
		this.getData=this.getData.bind(this);
	}

	getData() {

		let bearer=localStorage.getItem('Auth');
		let col_uid = '?uid='+this.state.coluser;
		let col_iid = '&iid='+this.state.colitem;
		let col_rati = '&rati='+this.state.colrating;
		let value_uid = '&value_uid='+this.props.selectUser;
		let value_iid = '&value_iid='+this.props.selectItem;
		let urlgetValue= '/predit/'+this.props.algorithm+'/result'
		+col_uid + col_iid + col_rati + value_uid + value_iid;
		let urlgetDatChart = '/predit/knnbasic/chartvalue'+col_uid
		+ col_iid + col_rati + value_uid +value_iid
		let options = {
			method: 'GET',
			headers: {
				'Authorization': bearer
			}
		}
		this.setState({resultBtn:'cursorNone'});
		this.getPreditValue(urlgetValue,options);
		this.getDataChart(urlgetDatChart,options);
	}
	getPreditValue(url,options) {
		fetch(url,options)
		.then(res=>res.json())
		.then(res=>
		{
			if(res.result){
				this.setState({rating:res.result.rati,
					selectuser:this.props.selectUser,
					selectitem:this.props.selectItem,
					time:res.time,
					resultBtn:''});
			}
		}
		)
		.catch(e=>{
			console.log(e);
		});  

	}
	getDataChart(url, options){
		fetch(url,options)
		.then(res=>res.json())
		.then(res=>
		{
			if(res.result){
				this.setState({valueChart:res.result});
			}
		}
		)
		.catch(e=>{
			console.log(e);
		});  
	}
	render(){
		return(
			<div className="col-lg-8">
			<div className="containRating" id="containRating">
			<span>
			{
				this.props.selectUser !== '' &&
				 this.props.selectItem !== '' ?
				(
					<span 
					className ={"btnPredit "+this.state.resultBtn}
					onClick={this.getData}>
					Result
					</span>
				)
				: ""
			}
			{
				this.state.time !== null ?
				<PrintButton 
				id="containRating"
				label={"Print pdf"}/> :""
			}
			</span>
			<div className="tableResult">
			<Table responsive>
			<thead>
			<tr>
			<th>{this.props.colUser}</th>
			<th>{this.props.colItem}</th>
			<th>{this.props.colRating}</th>
			<th>Time</th>
			</tr>
			</thead>
			<tbody>
			<tr>
			<td>
			{this.state.selectuser}</td>
			<td>{this.state.selectitem}</td>
			<td>{this.state.rating ? 
				this.state.rating: ''}
				</td>
			<td>{this.state.time ? 
				this.state.time: ''}
				</td>
				</tr>
				</tbody>
				</Table>{
					this.state.valueChart !== null ?
					<ValueChart
					dataChart={this.state.valueChart}
					col1 = {this.props.selectUser}
					col2 = {this.props.selectItem}/>: ""}
					</div>
					</div>
					</div>
					)
	}
}
export default Rating;