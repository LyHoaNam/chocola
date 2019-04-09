import React,{PureComponent} from "react";
import "../style/chill.css";
import {Link} from "react-router-dom";
import {Modal,Button} from "react-bootstrap";
class NextPredit extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			rating:"",
			user :"",
			item :"",
			arr:[]
		}
		this.handleChange=this.handleChange.bind(this);
	}
	componentDidMount(){
		if(localStorage.getItem('rawdata')){
			let templatedata=localStorage.getItem('rawdata');
			templatedata = JSON.parse(templatedata);
			let values = templatedata.data;
			let tempArr=[];
			values[0].map((item,index)=>
				tempArr.push(item));
			this.setState({
				arr:tempArr,
				user:tempArr[0],
				item:tempArr[0],
				rating:tempArr[0]
			})
		}
		
	}
	handleChange(event){
		const value=event.target.value;
		const name= event.target.name;

		this.setState({
			[name]:value
		})
	}
	render(){
		console.log(this.state.user);
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
			<select name="user" onChange={this.handleChange}>
			{
				this.state.arr.map((item,index)=>
					<option value={item} key={index}>{item}</option>)
			}
			</select>
			</div>
			</div>

			<div className="NextPreLine">
			<span className="NextPreTitle">
			Choose Items:
			</span>
			<div className="SelectCol">
			<select name="item" onChange={this.handleChange}>
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
			<select name="rating" onChange={this.handleChange}>
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
			onClick={this.props.onHide}
			className="Close">Back</Button>
			 </span>
			<Button className="Next">
			{
				 this.state.check ? ( 
				<Link to={{
				pathname:'/algorthm/predit',
				datasend: {
					user:this.props.user,
					item:this.state.item,
					rating:this.state.rating }
			}}>
			Finish
			{
				this.removeCache()
			}
			</Link>
			):
				'Finish'	}

			</Button>
			</div>
			</div>

			</div>
			)
	}

}
export default NextPredit;