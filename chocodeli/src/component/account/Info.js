import React, { PureComponent } from 'react';
import './login.css';
class Info extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			authorization:"",
			user:""
		}
		this.ImportImg=this.ImportImg.bind(this);
	}
	componentDidMount(){
		if(localStorage.getItem('Auth')){
			let author=localStorage.getItem('Auth');
			this.getInfoUser(author);
			this.setState({authorization:author})
		}
	}
	getInfoUser(bearer){
		let url= '/user/info';
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
			if(result.id){
				this.setState({user:result});
			}
		})
		.catch(error => console.error('Error:', error));
	}
	ImportImg(e){
		let url = '/user/import_img';
		let formdata = new FormData();
		formdata.append("fileimg", e.target.files[0]);
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
			console.log('response',response);
		})
		.catch(error => console.error('Error:', error));
	}
	render(){
			return(
				<div className="ContainProfile">
				<span className="Avatar">
				<input
				type="file"
				onChange= {this.ImportImg} />
				<img src={require('../../img/avatarraw.jpeg')} 
				className="avatarraw" 
				alt="logo" /></span>
				{this.state.user.id ? 
					<span className="ProfileUser">
					<p className="emailUser">
					{this.state.user.username}
					</p>
					<p className="nameUser">
					{this.state.user.name}
					</p>
					<p className="numberData">Number data: {
						this.props.length
					}</p>
					</span>:""}
					</div>
					)
		
	}
}
export default Info;