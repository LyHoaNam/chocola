import React, {PureComponent} from "react";
import "../style/chill.css";
import {Link } from 'react-router-dom';
import {Modal, Button} from  "react-bootstrap";
class NextAlgorthm extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			min_conf: '',
			min_supf: ''
		}
		this.handleChange=this.handleChange.bind(this);
	}
  handleChange(event) {
  	const value= event.target.value;
  	const name= event.target.name;
    this.setState({[name]: value});
  }
	render(){
		return(
			<Modal
			{...this.props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			
			>
			<Modal.Header>
			<Modal.Title id="contained-modal-title-vcenter">
			Setting Algorthm
			</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<div>
			<div className="FontTitle">
			Algorthm: {this.props.listdata !== null ?
				this.props.listdata.map((algo,index)=>
				{
					//write "," one each algo (alorthm)
					return index ===0 ?
						<span className="fontsmalltitle" key={index}>{" "+algo}</span>:
					<span className="fontsmalltitle" key={index}>{", "+algo}</span>
				}
				): ""}
			</div>
			<div className="FontTitle">
			Setup
			</div>

			<div className="InputGroup">
			<input type="text" 
			value={this.state.min_supf} 
			name='min_supf'
			placeholder="Enter min sup"
			className="Inputfields"
			onChange={this.handleChange} />
			</div>

			<div className="InputGroup">
			<input type="text" 
			value={this.state.min_conf}
			name='min_conf' 
			placeholder="Enter min conf"
			className="Inputfields"
			onChange={this.handleChange} />
			</div>

			</div>
			
			</Modal.Body>
			<Modal.Footer>
			<Button 
			onClick={this.props.onNeHide}
			className="Close">Back</Button>
			 
			<Button className="Next">
			<Link to={{
				pathname:'/algorthm',
				datasend: {
					ChooseAl: this.props.listdata,
					min_supf:this.state.min_supf,
					min_conf:this.state.min_conf
				}
			}}>
			Finish
			</Link>
			</Button>

			</Modal.Footer>
			</Modal>
			)
	}
}
export default NextAlgorthm;