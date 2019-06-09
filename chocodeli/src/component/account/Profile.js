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
		this.SelectData=this.SelectData.bind(this);
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
		.then(res => res.json())
		.then(response => {
			let result = response;
			if(result!=='false'){
				this.setState({listData:result});
			}
		})
		.catch(error => console.error('Error:', error));
	}
	readyToNext(result){
		if(result.status === 'success') {
			window.location.href="/";
		}
		else {
			alert('Something Invalid, Try again!');
		}
	}	SelectData(e){
		let url = '/data/import';
		let formdata = new FormData();
		formdata.append("filecsv", e.target.files[0]);
		let options = {
			method: 'POST',
			headers: {
				'Authorization': this.state.authorization
			},
			body: formdata
		}
		let req = new Request(url, options);
		
		fetch(req).then(res => res.json())
		.then(response => {
			this.readyToNext(response);
		})
		.catch(error => console.error('Error:', error));
	}
	saveNameData(name){
		sessionStorage.setItem('name_data',name);
		return "fas fa-angle-double-right icCheced";
	}
	writeDataFile(listData){
		let resultDiv=[];
		if(listData)
		{	
			listData.map((record,index)=>{

				let checkedBox = record.selected==="True"? 
				"fas fa-angle-double-right icCheced":""
				
				resultDiv.push(
					<tr className="detailData" 
					key={'detailData'+index}>
					<td className="nameData" 
					key={'nameData'+index}>
					<i className={checkedBox} />
					{record.data_name}
					</td>
					</tr>
					)})
		}	
		return resultDiv;

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
				console.log('success');
			}
		})
		.catch(error => console.error('Error:', error));
	}
	handleChange(event) {
		let valueChange = event.target.value
		if(valueChange !== ''){
			console.log('value',valueChange);
			this.postData(valueChange);
			this.setState({value:valueChange});
		}
	}
	render(){
		if(this.state.listData !=='') {
			let writelist = this.writeDataFile(
				this.state.listData);
			return(
				<div className='containRRD'>
				<div id="content">
				<div className="row">
				<div className="col-lg-8">
				<Info length={this.state.listData.length}/>
				</div>
				<div className="col-lg-4 pad100">
				<div className="ContaintData">
				<input id="choseFile" 
				name='fileName' 
				type="file"
				className="importNewData"
				onChange= {this.SelectData} />
				<div className="listData">
				<div className="titlelistData">List data</div>
				<div className="OverListData">
				<Table responsive>
				<tbody striped="true">	
				{
					writelist
				}
				</tbody>
				</Table>
				</div>
				</div>
				<div className="selectData">
				<select value={this.state.value}
				onChange={this.handleChange}
				className="select-css">
				{
					this.state.listData ?
					this.state.listData.map((record,index)=>{
						return record.selected==="True" ? 
						(<option key={index}
							className = "selectedLi"
							value = {record.id_data}>
							{record.data_name}</option>):
						(<option key={index}
							value = {""+record.id_data}>
							{record.data_name}</option>)
					}) : ""

				}
				</select>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				)
		}
		return "loading...";
		
	}
}
export default Profile;