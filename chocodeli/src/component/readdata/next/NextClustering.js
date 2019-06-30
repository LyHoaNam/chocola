import React,{PureComponent} from "react";
import "../../../style/chill.css";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
class NextPredit extends PureComponent {
	constructor(props){
		super(props);
		this.state ={
			xaxits:this.props.column[1],
			yaxits :this.props.column[2],
			arr:[]
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
			xaxits:tempCol[0],
			yaxits:tempCol[1]});
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
	if(localStorage.getItem('fpgrowth'))
		localStorage.removeItem('fpgrowth');
	//remove localStorage apiori
	if(localStorage.getItem('apiori'))
		localStorage.removeItem('apiori');
	
	if(localStorage.getItem('usercol'))
		localStorage.removeItem('usercol');
	if(localStorage.getItem('itemcol'))
		localStorage.removeItem('itemcol');
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
		X axits:
		</span>
		<div className="SelectCol">
		<select name="xaxits" 
		onChange={this.handleChange}
		className='select-css'
		value={this.state.xaxits}>
		{
			this.state.arr.map((item,index)=>
				<option value={item} key={index}>{item}</option>)
		}
		</select>
		</div>
		</div>

		<div className="NextPreLine">
		<span className="NextPreTitle">
		Y axits
		</span>
		<div className="SelectCol">
		<select name="yaxits" 
		onChange={this.handleChange}
		className='select-css'
		value={this.state.yaxits}>
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
			pathname:'/cluster/kmeans',
			datasend: {
				ChooseAl:this.props.listdata,
				yaxits:this.state.yaxits,
				xaxits:this.state.xaxits }
			}}>{
			this.removeCache()
			}
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