import React, { PureComponent } from 'react';
import './login.css';
import "../../style/chill.css";
import CreateAccount from './CreateAccount';

class Start extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			username: '',
			password:'',
			tooltipusername :false,
			tooltippassword : false,
			check: false,
			modalCreateAccount:false

		}
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		const value= event.target.value;
		const name= event.target.name;
		const tooltipname = 'tooltip'+name;

		if(value !== '' && value.indexOf(" ") === -1)
		{
			this.setState({[tooltipname]:false,
				check:true});}
			else
				this.setState({[tooltipname]:true,
					check:false});
			
			this.setState({[name]: value});
		}
		readyToNext(result){
			if(result === 'false') {
				alert('Username or password Invalid');
				this.setState({username:'',password:''});
			}
			else {
				localStorage.setItem('account',result);
				window.location.href="/profile";
			}
		}
		handleSubmit(){
			let CheckUser = this.state.username;
			if(CheckUser.indexOf("@") === -1)
				{this.setState({tooltipusername:true,check:false});}
			else {
				if(this.state.check) {
					let root = "http://localhost:5000/";
					let url= root + 'api/login'
					let formdata = new FormData();
					formdata.append('user', this.state.username);
					formdata.append('pass', this.state.password);
					let options = {
						method: 'POST',
						body: formdata
					}
					let req = new Request(url,options);
					fetch(req)
					.then(res => res.json())
					.then(response => {
						let result = JSON.stringify(response);
						this.readyToNext(result);
					})
					.catch(error => console.error('Error:', error));
				}
			}
		}

		render() {
			let modalCreateAcountClose = ()=> {this.setState({modalCreateAccount:false})};
			let modalCreateAccountShow = ()=> {this.setState({modalCreateAccount:true})};
			return (

				<div className="row marginRight0">
				<div className="col-lg-5">
				<div className="haftBg">
				<img src={require('../../img/logonew.png')} className="App-logo" alt="logo" />
				<p className="welcome">
				Recommender System Tool For Everyone
				</p>
				<div className="toChocola">
				Welcome to Chocola, this tool can help you make everything great than. Click a button below, choose a best data and get a good result
				</div>
				</div>
				</div>

				<div className="col-lg-7">
				<div className="containLg">
				<div className="TextLogin">
				Sign in to Chocola
				</div>

				<div className="ContainText">
				<input type="text" 
				value={this.state.username}
				name='username' 
				placeholder="Enter your username"
				className="Inputfields"
				onChange={this.handleChange} />
				<div className="tooltipNoti">
				<span className={!this.state.tooltipusername? 
					"tooltiptext":
					"tooltipActive"}>
					{'This user name is Invalid!'}
					</span>
					</div>
					</div>
					<div className="ContainText">
					<input type="password" 
					value={this.state.password}
					name='password' 
					placeholder="Enter your password"
					className="Inputfields"
					onChange={this.handleChange} 
					onKeyPress={
						event => {if(event.key === 'Enter')
						{this.handleSubmit()}}
					}/>
					<div className="tooltipNoti">
					<span className={!this.state.tooltippassword? 
						"tooltiptext":
						"tooltipActive"}>
						{'This password is Invalid!'}
						</span>
						</div>
						</div>
						<div className="containBtn">
						<input className="ButtonLogin" defaultValue="Submit" type="submit"
						onClick = {this.handleSubmit}/>
						<input className="ButtonCreateAcc"
						type = "button"
						defaultValue="Create Account"
						onClick={modalCreateAccountShow}/>

						<CreateAccount 
						show={this.state.modalCreateAccount}
						onHide={modalCreateAcountClose}/>
						</div>

						</div>
						</div>
						</div>

						);
		}
	}

	export default Start;
