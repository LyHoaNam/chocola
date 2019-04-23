import React, {PureComponent} from "react";
import {Modal, Button} from "react-bootstrap";

class CreateAccount extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            newPass:"",
            newUser:"",
            tooltipnewPass:"",
            tooltipnewUser:"",
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
        if(result === 'false') {
            alert('cannot create an account, try again!');
            this.setState({newPass:'',newUser:''});
        }
        else {
            this.props.onHide;
            window.location.href="/";
        }
    }
    handleSubmit(){
        let CheckUser = this.state.newUser;
        if(CheckUser.indexOf("@") === -1)
        {this.setState({tooltipnewUser:true,check:false});}
        else {
        if(this.state.check) {
            let root = "http://localhost:5000/";
            let url= root + 'api/createaccount'
            let formdata = new FormData();
            formdata.append('user', this.state.newUser);
            formdata.append('pass', this.state.newPass);
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
    render(){
        return (
            <Modal
            {...this.props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter">

            <Modal.Body>
            <div className="ContainModalBody">
            <div className="ContainImgModalBody">
            <img  src={require('../../img/logonew.png')} className="imgModal"/>
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
            <input type="text" value={this.state.newUser} 
            placeholder="Enter your new username"
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
            placeholder="Enter your new password"
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