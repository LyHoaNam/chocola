import React,{PureComponent} from "react";
import "../../../style/chill.css";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
class NextPredit extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			xaxits:this.props.column[0],
			yaxits :this.props.column[1],
			arr:this.props.column
		}
		this.handleChange=this.handleChange.bind(this);
	}
	handleChange(event){
		const value=event.target.value;
		const name= event.target.name;

		this.setState({
			[name]:value
		})
	}
	render(){
		return(
			<div className="NextModal">

			<h3>Setting Algorthm</h3>
			<div className="FontTitle">
			Choose Algorthm
			</div>

			<div className="NextPreLine">
			<span className="NextPreTitle">
			Choose User:
			</span>
			<div className="SelectCol">
			<select name="yaxits" onChange={this.handleChange}
			value={this.state.yaxits}>
			{
				this.state.arr.map((item,index)=>
					<option value={item} key={index}>{item}</option>)
			}
			</select>
			</div>
			</div>

			<div className="NextPreLine">
			<span className="NextPreTitle">
			Choose Ratings:
			</span>
			<div className="SelectCol">
			<select name="xaxits" onChange={this.handleChange}
			value={this.state.xaxits}>
			{
				this.state.arr.map((item,index)=>
					<option value={item} key={index}>{item}</option>)
			}
			</select>
			</div>
			</div>

			<div className="ModalFooter">
			<div className="ContainBtnBox">
			<span className="paddingRight15">
			<Button 
			onClick={this.props.onNeHide}
			className="Close">Back</Button>
			 </span>
			<Button className="Next">
				<Link to={{
				pathname:'/algorthm/kmeans',
				datasend: {
					ChooseAl:this.props.listdata,
					yaxits:this.state.yaxits,
					xaxits:this.state.xaxits }
			}}>
			Finish

			</Link>
			</Button>
			</div>
			</div>

			</div>
			)
	}

}
export default NextPredit;