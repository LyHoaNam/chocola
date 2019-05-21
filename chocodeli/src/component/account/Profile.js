import React, { PureComponent } from 'react';
import './login.css';
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
					<div className="detailData" 
					key={'detailData'+index}>
					<i className={checkedBox} />
					<span className="titleData" 
					key={'titleData'+index}>
					
					</span>
					<span className="nameData" 
					key={'nameData'+index}>
					{record.data_name}
					</span>
					</div>
					)})
		}	
		return resultDiv;

	}
	writeListDropDown(listData){
		let resultLi=[];
		if(listData)
		{	
			listData.map((record,index)=>{
				let classLi = record.selected==="True" ? 
				"selectedLi": "";
				resultLi.push(
					<li key={index}
					className = {classLi}>
					{record.data_name}</li>
					)})
		}	
		return resultLi;
	}
	
	render(){
		if(this.state.listData !=='') {
			let writelist = this.writeDataFile(
				this.state.listData);
			let writeLi = this.writeListDropDown(
				this.state.listData);
			return(
				<div className='containRRD'>
				<div id="content">
				<div className="row">
				<div className="col-lg-8">
				<div className="ContainProfile">
				<span className="Avatar">
				<img src={require('../../img/avatarraw.jpeg')} className="avatarraw" alt="logo" /></span>
				<span className="ProfileUser">{this.state.user}</span>
				</div>
				</div>
				<div className="col-lg-4 pad100">
				<div className="ContaintData">
				<input id="choseFile" 
				name='fileName' 
				type="file"
				onChange= {this.SelectData} />
				<div className="listData">
				<div className="titlelistData">List data</div>
				{
					writelist
				}
				</div>

				<label className="dropdown">

				<div className="dd-button">
				Change Selected
				</div>

				<input type="checkbox" className="dd-input" id="test"/>

				<ul className="dd-menu">
				{writeLi}
				</ul>

				</label>

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