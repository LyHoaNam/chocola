import React, { PureComponent } from 'react';
import './login.css';

class Start extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			username: '',
			password:''
		}
		this.handleChangeUser=this.handleChangeUser.bind(this);
		this.handleChangePass=this.handleChangePass.bind(this);
	}
	handleChangeUser(event){
		let userName=event.target.value;
		this.setState({username:userName});
	}

	handleChangePass(event){
		let pass=event.target.value;
		this.setState({password:pass});
	}
	handleSubmit(){
	
	}

  render() {
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
      <form onSubmit="">
      <div className="ContainText">
      <input type="text" 
			value={this.state.username}
			name='username' 
			placeholder="Enter your username"
			className="Inputfields"
			onChange={this.handleChangeUser} />
		</div>
		<div className="ContainText">
      <input type="password" 
			value={this.state.password}
			name='password' 
			placeholder="Enter your username"
			className="Inputfields"
			onChange={this.handleChangePass} />
		</div>
		<div className="containBtn">
		<input className="ButtonLogin"
		value="Login" type="Submit"/>
		<input className="ButtonCreateAcc"
		value="Create Account"/>
		</div>
		</form>
      </div>
      </div>
      </div>

    );
  }
}

export default Start;
