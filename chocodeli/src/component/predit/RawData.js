import React, { PureComponent } from "react";
import '../../style/chill.css';
import Loading from "../Loading";
import {Table} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroller';
class RawData extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			hasMoreItem:true,
			inputValue: '',
			table: [],
			page: 1
		}
		this.loadFunc = this.loadFunc.bind(this);
		this.filterFunc = this.filterFunc.bind(this);
	}
	loadFunc() {
			//ready to fetch data
			let col_uid = '&uid='+this.props.colUser;
			let col_iid = '&iid='+this.props.colItem;
			let col_rati = '&rati='+this.props.colRating;
			let page = '?page='+ this.state.page;
			let url= '/predit/knnbasic/rawdata'+page+col_uid+col_iid+col_rati;
			let author=localStorage.getItem('Auth');
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
				if(res.status === "success")
				{
					this.setState({
					table:this.state.table.concat(res.data),
					page: this.state.page+1,
					hasMoreItem:true
					});
				}
				else{
					this.setState({hasMoreItem:false});
				}
			}
			)
			.catch(e=>{
				this.setState({hasMoreItem:false});
			});   
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
	writeRow(listValue) {
		if (listValue !== '')
		{
			let row = [];
			listValue.map((record,index)=>{
				row.push(
					<tr key={index}>
					<td key={'i'+index}> {index+1} </td>
					{record.map((item,i)=>
						<td key={i}>{item}</td>
						)
				}
				</tr>
				)
			})
			return row;
		}
		else{
			return <tr></tr>
		}
	}
	render() {
		let rowvalue = this.writeRow(this.state.table);
		return (
		<div className="col-lg-6">
		<div className="Infomation martop10">
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
		<InfiniteScroll
		pageStart={0}
		loadMore={this.loadFunc}
		hasMore={this.state.hasMoreItem}
		loader={<div className="loader" 
		key={0}>Loading ...</div>}
		useWindow={false}
		>
		<Table responsive>
		<tbody striped="true">	
		{
			rowvalue
		}
		</tbody>
		</Table>
		</InfiniteScroll>

		</div>
		</div>
		</div>
		)
	}
}

export default RawData;
