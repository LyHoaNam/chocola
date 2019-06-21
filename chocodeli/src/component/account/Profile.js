import React, { PureComponent } from 'react';
import './login.css';
import {Table} from "react-bootstrap";
import Info from './Info';
class Profile extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			authorization:"",
			listData:'',
			writeList:"",
			user:""
		}
		
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount(){
		if(localStorage.getItem('Auth')){
			let author=localStorage.getItem('Auth');
			this.setState({authorization:author});
			this.getData(author);
		}
	}
	getData(bearer){
		let url= '/data/all';
		let options = {
			method: 'GET',
			headers: {
				'Authorization': bearer
			}
		}
		let req = new Request(url,options);
		fetch(req)
		.then(res => {
			if(res.ok) {
				return res.json();
			}
			throw new Error(res.status);
		})
		.then(response => {
				this.setState({listData:response});
			
		})
		.catch(error => console.error('Error:', error));
	}
	
	saveNameData(name){
		sessionStorage.setItem('name_data',name);
		return "fas fa-angle-double-right icCheced";
	}
	writeDataFile(listData){
		let resultDiv=[];
		if(listData !== '')
		{	
			listData.map((record,index)=>{
				let checkedBox = record.selected==="True"? 
				"cellSelected":"";

				resultDiv.push(
					<tr className={"detailData "+checkedBox}
					key={'detailData'+index}>
					<td key={'index' +index} >
					{index +1}
					</td>
					<td className="nameData" 
					key={'nameData'+index}>
					{record.data_name}
					</td>
					<td className="nameData" 
					key={'inserted at'+index}>
					{record.data_name.slice(0,10).replace(/_/g,'/')}
					</td>
					</tr>
					)
			});
			return resultDiv;
		}	
		return <tr></tr>

	}
	postData(valueChange){
		let bearer = this.state.authorization;
		let url= '/data/selected';
		let formdata = "{\"id_data\":\""+
		valueChange+"\"}";

		let options = {
			method: 'POST',
			headers: {
				'Authorization': bearer,
				'Content-Type' : 'application/json',
				'Accept': 'application/json'
			},
			body: formdata
		}
		let req = new Request(url,options);
		fetch(req)
		.then(res => res.json())
		.then(response => {
			let result = response.status;
			if(result!=='success'){
				window.location.href="/";
			}
		})
		.catch(error => console.error('Error:', error));
	}
	handleChange(event) {
		let valueChange = event.target.value
		if(valueChange !== ''){
			this.postData(valueChange);
			this.setState({value:valueChange});
		}
	}
	writeChangeSelected(listData){
		let arrResult = [];
		if(listData !== ''){
			listData.map((record,index)=>{
				record.selected==="True" ? 
				arrResult.splice(0,0,<option key={index}
					className = "selectedLi"
					value = {record.id_data}>
					{record.data_name}</option>):
				arrResult.push(<option key={index}
					value = {""+record.id_data}>
					{record.data_name}</option>)
			})
			return arrResult;
		}
		return <option>You have no data! Please import data</option>
	}
	render(){
		let writelist = this.writeDataFile(
			this.state.listData);
		let writeSelected = this.writeChangeSelected(
			this.state.listData);
		return(
			<div className='containRRD'>
			<div id="content">
			<div className="row">
			<div className="col-lg-6">
			<Info length={this.state.listData.length}/>
			</div>
			<div className="col-lg-6 pad100">
			<div className="ContaintData">
			<div className="selectData">
			<span className="ChangeSeletecTitle">
			Change selected file:
			</span>
			<select value={this.state.value}
			onChange={this.handleChange}
			className="select-css">
			{
				writeSelected

			}
			</select>
			</div>
			<div className="listData">
			<div className="OverListData">
			<Table responsive>
			<thead>
	         <tr>
	         <th>No</th>
	         <th>Name of data</th>
	         <th scope="col">date inserted</th>
	         </tr>
	         </thead>
			<tbody striped="true">	
			{
				writelist
			}
			</tbody>
			</Table>
			</div>
			</div>
			
			</div>
			</div>
			</div>
			</div>
			</div>
		)
	}
}
export default Profile;