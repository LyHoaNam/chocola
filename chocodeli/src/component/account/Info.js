import React, { PureComponent } from 'react';
import './login.css';
class Info extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			authorization:"",
			username:"",
			email:'',
			imgurl:null
		}
		this.SelectData=this.SelectData.bind(this);
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
	readyToNext(result){
		if(result.status === 'success') {
			window.location.href="/";
		}
		else {
			alert('Something Invalid, Try again!');
		}
	}	
	SelectData(e){
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
	render(){
		return(
			<div className="ContainProfile">
			<span className="Avatar">
			<input
			type="file"
			alt="Import your avatar"
			className="importNewImg"
			onChange= {this.ImportImg} />
			{
				this.state.imgurl === null ?
				<img src={
					require('../../img/avatarraw.jpeg')} 
					className="avatarraw" alt="import your avatar" />:
				<img src={
					require('../../img/'+ this.state.imgurl)} 
					className="avatarraw" alt="avatar"/>
				
			}
			</span>
			<span  className="ProfileUser">
			{
				this.state.email !=='' ? 
				<span>
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
			<input id="choseFile" 
				name='fileName' 
				type="file"
				className="importNewData"
				onChange= {this.SelectData} />

				<div className="tooltipNoti">
				<span className={this.props.length > 0 ? 
					"tooltiptext":
					"tooltipActive"}>
					{'Import Data in here!'}
				</span>
				</div>
				
			</span>
			</div>
				)
		
	}
}
export default Info;