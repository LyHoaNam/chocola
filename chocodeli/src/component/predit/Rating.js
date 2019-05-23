import React, {PureComponent} from "react";
import "./predit.css";
import {Table} from "react-bootstrap";
class Rating extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			selectuser:this.props.selectUser,
			selectitem:this.props.selectItem,
			coluser:this.props.colUser,
			colitem:this.props.colItem,
			colrating:this.props.colRating,
			rating:false
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
		let url= '/predit/knnbasic/result'+col_uid
		+ col_iid + col_rati + value_uid + value_iid;
		let options = {
			method: 'GET',
			headers: {
				'Authorization': bearer
			}
		}
		fetch(url,options)
		.then(res=>res.json(  ))
		.then(res=>
		{
			if(res.KNNBasic){
				this.setState({rating:res.KNNBasic.rati,
					selectuser:this.props.selectUser,
					selectitem:this.props.selectItem});
			}
		}
		)
		.catch(e=>{
			console.log(e);
		});  

	}
	render(){
		return(
			<div className="col-lg-6">
			<div className="containRating">
			<span className ="btnPredit"
			onClick={this.getData}>
			Result
			</span>
			<div className="tableResult">
			<Table responsive>
			<thead>
			<tr>
			<th>User</th>
			<th>Item</th>
			<th>Rating</th>
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
				</tr>
				</tbody>
				</Table>
				</div>
				</div>
				</div>
				)
			}
		}
		export default Rating;