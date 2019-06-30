import React, { PureComponent } from "react";
import '../../style/chill.css';
import {Table} from "react-bootstrap";
import PrintButton from "../PrintButton";
class FromTo extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			hasMoreItem:false,
			inputValue: '',
			table: [],
			origin: [],
			from_uid :'',
			to_uid:'',
			from_iid:'',
			to_iid:'',
			authorization: '',
			time:'',
			resultBtn :''
		}
		this.filterFunc = this.filterFunc.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getResultFromTo = this.getResultFromTo.bind(this);
	}
	handleChange(event) {
		const value= event.target.value;
		const name= event.target.name;
		this.setState({[name]:value});
	}
	filterFunc(e){
		let masterData = this.state.origin;
		let toSearch= e.target.value;
		let searchData = [];
		if(toSearch !==""){
			toSearch = Number(toSearch);
			searchData = masterData.filter(item =>
				{ 
					return item.indexOf(toSearch) !== -1
				})
		}		
		else {
			searchData=masterData;
		}
		this.setState({inputValue:toSearch,
			table:searchData});
	}
getResultFromTo(){
	let from_uid = this.state.from_uid;
	let to_uid = Number(this.state.to_uid)+1;
	let from_iid = this.state.from_iid;
	let to_iid = Number(this.state.to_iid)+1;
	let author=localStorage.getItem('Auth');
	if(from_iid !== '' & to_uid !== '' 
		& from_iid !=='' & to_iid !=='') {
			let col_uid = '?uid='+this.props.colUser;
			let col_iid = '&iid='+this.props.colItem;
			let col_rati = '&rati='+this.props.colRating;
			let fromto = '&from_uid='+ from_uid +'&to_uid=' + to_uid
			+ '&from_iid=' + from_iid + '&to_iid=' +to_iid;

			let url= '/predit/'+this.props.algorithm+'/fromto'
			+col_uid+col_iid+col_rati+fromto;
			let options = {
				method: 'GET',
				headers: {
					'Authorization': author
				}
			}
			this.setState({resultBtn:'cursorNone'});

			fetch(url,options)
			.then(res=>res.json())
			.then(res=>
			{
				if(res.result)
				{
					this.setState({table:res.result,
						origin: res.result,
						time:res.time,
						resultBtn:''});
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
		<div className="Infomation martop10"
		id="containtFromTo">
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
		onChange={this.handleChange}
		onKeyPress={
			event => {if(event.key === 'Enter')
			{this.getResultFromTo()}}
		}/>
		</div>
		<div className="btnFromTo">
		{
			this.state.from_iid  !== '' &&
			this.state.from_uid !== '' &&
			this.state.to_iid !== '' &&
			this.state.to_uid !== '' ?
			<span 
			className ={"btnPredit "+this.state.resultBtn}
			onClick={this.getResultFromTo}>
			Get Result
			</span> : ""
		}
		{
			this.state.time !== '' ?
			<PrintButton 
			id="containtFromTo"
			label={"Print pdf"}/> :""
		}
		</div>
		</div>
		<div className="selectFromTo">
		<span className="DetailInfo">
		Time to run: 
		</span>
		<span>
		{this.state.time}
		</span>
		</div>
		<div className="DetailContent">
		<span className="DetailInfo">
		Result
		</span>
		<span className="SerachButton">
		<input type="number" className="form-control"  
		placeholder="Search" 
		value={this.state.inputValue}
		onChange={this.filterFunc}
		/>
		</span>
		</div>
		<div className="OverFlow">    
		<Table responsive>
		<thead>
	     <tr>
	     <th>No</th>
	     <th>Uid</th>
	     <th>Iid</th>
	     </tr>
	    </thead>
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
