import React,{PureComponent} from "react";
import "../../../style/chill.css";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
class NextPredit extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			rating:this.props.column[2],
			user :this.props.column[0],
			item :this.props.column[1],
			arr:this.props.column
		}
		this.handleChange=this.handleChange.bind(this);
	}
	componentDidMount(){
		let allColmn = this.props.column;
		let tempCol = [];
			this.props.type.map((records,item)=> {
				records !== 'object' ?
				tempCol.push(
					allColmn[item]
				): ''
			})
		this.setState({arr:tempCol,
			rating:tempCol[0],
			user:tempCol[1],
			item:tempCol[2]});
	}
	handleChange(event){
		const value=event.target.value;
		const name= event.target.name;

		this.setState({
			[name]:value
		})
	}
	    removeCache(){
  	//remove session datasend (obj = {minsup... min conf...})
  	if (sessionStorage.getItem('datasend'))
		sessionStorage.removeItem('datasend');
	//remove localStorage fpgrowth
	if (localStorage.getItem('fpgrowth'))
		localStorage.removeItem('fpgrowth');
	//remove localStorage apiori
	if (localStorage.getItem('apiori'))
		localStorage.removeItem('apiori');
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
			<select name="user" 
			onChange={this.handleChange}
			className='select-css'
			value={this.state.user}>
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
			<select name="item"
			className='select-css'
			onChange={this.handleChange}
			value={this.state.item}>
			{
				this.state.arr.map((item,index)=>
					<option value={item}
					 key={index}>{item}</option>)
			}
			</select>
			</div>
			</div>

			<div className="NextPreLine">
			<span className="NextPreTitle">
			Choose Ratings:
			</span>
			<div className="SelectCol">
			<select name="rating" 
			onChange={this.handleChange}
			className='select-css'
			value={this.state.rating}>
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
				pathname:'/predit/'+this.props.listdata[0],
				datasend: {
					ChooseAl:this.props.listdata,
					user:this.state.user,
					item:this.state.item,
					rating:this.state.rating }
			}}>
			Finish
			</Link>
			{this.state.rating ?
				this.removeCache() : ""}

			</Button>
			</div>
			</div>

			</div>
			)
	}

}
export default NextPredit;