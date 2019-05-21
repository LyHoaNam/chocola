import React, { PureComponent } from "react";
import '../../style/chill.css';
import Loading from "../Loading";
import {Table} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroller';
class Tables extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			hasMoreItem:false,
			inputValue: '',
			table: this.props.data,
			page: 1
		}
		this.loadFunc = this.loadFunc.bind(this);
		this.filterFunc = this.filterFunc.bind(this);
	}
	getData(page) {
			//ready to fetch data
			let url= '/data/page/'+page;
			let options = {
				method: 'GET',
				headers: {
					'Authorization': this.state.authorization
				}
			}
			fetch(url,options)
			.then(res=>res.json())
			.then(res=>
			{
				this.setState({table:res});
			}
			)
			.catch(e=>{
				this.setState({hasMoreItem:false});
			});   
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
writeRow(listValue) {
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
render() {
	if(this.state.table.status === 'success'){
		let rowvalue = this.writeRow(this.state.table.data);
		return (
			<div className="col-lg-12">
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
			);}
			else
				return <Loading/>
	}
}

export default Tables;
