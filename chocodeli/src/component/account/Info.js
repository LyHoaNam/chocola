import React, { PureComponent } from 'react';
import './login.css';
class Info extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			authorization:"",
			username:"",
			email:'',
			imgurl:''
		}
		this.ImportImg=this.ImportImg.bind(this);
	}
	componentDidMount(){
		if(localStorage.getItem('Auth')){
			let author=localStorage.getItem('Auth');
			this.setState({authorization:author})
		}
			this.readProfileUser();
	}
	readProfileUser(){
		if(localStorage.getItem('profile')){
			let UserProfile = localStorage.getItem('profile');
			
			UserProfile = JSON.parse(UserProfile);
			this.setState({username:UserProfile.name,
				email:UserProfile.username,
				imgurl:UserProfile.img_url});
		}
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
			this.setState({imgurl:response});
		})
		.catch(error => console.error('Error:', error));
	}
	render(){
		console.log('propfile ',this.state.imgurl);
		console.log('propfile type ',typeof this.state.imgurl);
		return(
			<div className="ContainProfile">
			<span className="Avatar">
			<input
			type="file"
			className="importNewImg"
			onChange= {this.ImportImg} />
			{
				this.state.imgUrl === '' ?
				<img src={
					require('../../img/avatarraw.jpeg')} 
					className="avatarraw" alt="logo" />:
				<img src={
					require('../../img/'+ "2019060504531377.jpg")} 
					className="avatarraw"/>
				
			}
			</span>
			{
				this.state.email !=='' ? 
				<span className="ProfileUser">
				<p className="emailUser">
				{this.state.email}
				</p>
				<p className="nameUser">
				{this.state.username}
				</p>
				<p className="numberData">Number data: 
				{this.props.length}
				</p>
				</span>:""
			}
			</div>
				)
		
	}
}
export default Info;