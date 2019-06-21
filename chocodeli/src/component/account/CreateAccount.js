import React, {PureComponent} from "react";
import {Modal} from "react-bootstrap";

class CreateAccount extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            newPass:"",
            newUser:"",
            nameUser:"",
            confirmPass:"",
            tooltipnewPass:"",
            tooltipnewUser:"",
            tooltipconirmPass:"",
            check:false
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
        if(result.status === 'success') {
            alert('Create an account successfully, try it now');
            window.location.href="/";
            
        }
        else {
            alert('User already exists. Please Log in.!');
            this.setState({newPass:'',newUser:''});
        }
    }
    handleSubmit(){
        let CheckUser = this.state.newUser;
        if(CheckUser.indexOf("@") === -1){
            this.setState({tooltipnewUser:true,check:false});
        }
        if(this.state.newPass !== this.state.confirmPass) {
            this.setState({tooltipconirmPass:true,check:false});
        }
        else {
        if(this.state.check && this.state.newUser !== '' 
            && this.state.nameUser !=='' && this.state.newPass !=='') {
            let headers = new Headers();
                    headers.append('Content-Type', 'application/json',
                        'Accept': 'application/json');
            let url= '/user/'
            let formdata ="{\"name\":\""+
                    this.state.nameUser+
                    "\",\"username\":\""+
                    this.state.newUser +
                    "\",\"password\":\""+
                    this.state.newPass +
                    "\"}";
            console.log('formdata',formdata);
            let options = {
                method: 'POST',
                body: formdata,
                headers: headers
            }
            let req = new Request(url,options);
            fetch(req)
            .then(res => res.json())
            .then(response => {
                //let result = JSON.stringify(response);
                this.readyToNext(response);
            })
            .catch(error => console.error('Error:', error));
        }
        else {
            alert('oops! you have filled something missing ...')
        }
    }
    }
    render(){
        return (
            <Modal
            {...this.props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter">

            <Modal.Body>
            <div className="ContainModalBody">
            <div className="ContainImgModalBody">
            <img  src={require('../../img/logonew.png')} 
            className="imgModal"
            alt="logo"/>
            </div>
            <div className="Intro">
            <div className="BoldText">
            Create an account to use the system
            </div>
            <div className="RegularText">
            Use the recommention system more easily and for free
            </div>
            </div>
            <div className="ContainText">
            <input type="text" value={this.state.nameUser} 
            placeholder="Enter your name"
            className="Inputfields"
            name='nameUser'
            onChange={this.handleChange}
            />
            
            </div>

            <div className="ContainText">
            <input type="text" value={this.state.newUser} 
            placeholder="Enter your email"
            className="Inputfields"
            name='newUser'
            onChange={this.handleChange}
            />
            <div className="tooltipNoti">
            <span className={!this.state.tooltipnewUser? 
                "tooltiptext":
                "tooltipActive"}>
            {'This new username is Invalid!'}
            </span>
            </div>
            </div>
            <div className="ContainText">
            <input type="password" value={this.state.newPass} 
            placeholder="password"
            className="Inputfields"
            name='newPass'
            onChange={this.handleChange}
            />
            <div className="tooltipNoti">
            <span className={!this.state.tooltipnewPass? 
                "tooltiptext":
                "tooltipActive"}>
            {'This new password is Invalid!'}
            </span>
            </div>
            </div>
            <div className="ContainText">
            <input type="password" value={this.state.confirmPass} 
            placeholder="Confirm password"
            className="Inputfields"
            name='confirmPass'
            onChange={this.handleChange}
            onKeyPress={
                        event => {if(event.key === 'Enter')
                        {this.handleSubmit()}}}
            />
            <div className="tooltipNoti">
            <span className={!this.state.tooltipconirmPass? 
                "tooltiptext":
                "tooltipActive"}>
            {'This new password not cofirm!'}
            </span>
            </div>
            </div>
            <div className="ContainText">
            <input type="button" 
            className="btnCreatAccount" 
            value="Create Account"
            onClick={this.handleSubmit}/>
            </div>
            </div>

            </Modal.Body>
            </Modal>
        )
    }
}
export default CreateAccount;