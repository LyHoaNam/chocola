import React, { PureComponent } from "react";
import '../../style/chill.css';
import {Table} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroller';
class FromTo extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			hasMoreItem:false,
			inputValue: '',
			table: [],
			from_uid :'',
			to_uid:'',
			from_iid:'',
			to_iid:'',
			authorization: ''
		}
		this.loadFunc = this.loadFunc.bind(this);
		this.filterFunc = this.filterFunc.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getResultFromTo = this.getResultFromTo.bind(this);
	}
handleChange(event) {
	const value= event.target.value;
	const name= event.target.name;
	this.setState({[name]:value});
}
loadFunc(){
	if(this.state.hasMoreItem === true){
		let endPoint = this.state.page +1;
			//this.setState({page:endPoint});
			this.getData(endPoint);
			this.setState({hasMoreItem:false});	
		}

	}
	filterFunc(e){
		let masterData = this.props.data;
		let toSearch= e.target.value;
		let searchData = [];
		if(toSearch !=="")
			{masterData.filter(item =>
				{ 
					if(item.includes(toSearch)===true)
						searchData.push(item);
				})
	}		
	else {
		searchData=masterData;
	}
	this.setState({inputValue:toSearch,
		original:searchData,
		hasMoreItem:false});
}
getResultFromTo(){
	let from_uid = this.state.from_uid;
	let to_uid = this.state.to_uid;
	let from_iid = this.state.from_iid;
	let to_iid = this.state.to_iid;
	let author=localStorage.getItem('Auth');
	if(from_iid !== '' & to_uid !== '' 
		& from_iid !=='' & to_iid !=='') {
			let col_uid = '?uid='+this.props.colUser;
			let col_iid = '&iid='+this.props.colItem;
			let col_rati = '&rati='+this.props.colRating;
			let fromto = '&from_uid='+ from_uid +'&to_uid=' + to_uid
			+ '&from_iid=' + from_iid + '&to_iid=' +to_iid;

			let url= '/predit/knnbasic/fromto'+col_uid
			+col_iid+col_rati+fromto;
			let options = {
				method: 'GET',
				headers: {
					'Authorization': author
				}
			}
			fetch(url,options)
			.then(res=>res.json())
			.then(res=>
			{
				if(res.KNNBasic)
				{
					this.setState({table:res.KNNBasic});
				}
			}
			)
		.catch(e=>{
			this.setState({hasMoreItem:false});
		});   
	}
}
render() {
	return (
		<div className="col-lg-6">
		<div className="Infomation martop10">
		<div className="selectFromTo">
		<div>
		<span className="DetailInfo">
		Select Uid from:
		</span>
		<input type="number" className="ipFromTo"
		name="from_uid" value={this.state.from_uid}
		onChange={this.handleChange}/>
		<span className="DetailInfo">
		To:
		</span>
		<input type="number" className="ipFromTo"
		name="to_uid" value={this.state.to_uid}
		onChange={this.handleChange}/>
		</div>
		<div>
		<span className="DetailInfo">
		Select Iid from:
		</span>
		<input type="number" className="ipFromTo"
		name="from_iid" value={this.state.from_iid}
		onChange={this.handleChange}/>
		<span className="DetailInfo">
		To:
		</span>
		<input type="number" className="ipFromTo"
		name="to_iid" value={this.state.to_iid}
		onChange={this.handleChange}/>
		</div>
		<span className="btnPredit"
		onClick={this.getResultFromTo}>Get Result</span>
		</div>
		<div className="DetailContent">
		<span className="DetailInfo">
		Result
		</span>
		<span className="SerachButton">
		<input type="text" className="form-control"  
		placeholder="Search" 
		value={this.state.inputValue}
		onChange={this.filterFunc}
		/>
		</span>
		</div>
		<div className="OverFlow">    
		<Table responsive>
		<tbody striped="true">	
		{
			this.state.table.length > 0 ?
			this.state.table.map((record,index)=>(
				<tr key={index}>
				<td key={'i'+index}> {index+1} </td>
				{record.map((item,i)=>
					<td key={i}>{item}</td>)
			}
			</tr>)
			): <tr></tr>
		}
		</tbody>
		</Table>
		</div>
		</div>
		</div>
		)
}
}

export default FromTo;
