import React, { PureComponent } from "react";
import '../../style/chill.css';
import {Table} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroller';
class Tables extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			hasMoreItem:true,
			inputValue: '',
			table: [],
			page: 0
		}
		this.loadFunc = this.loadFunc.bind(this);
		this.filterFunc = this.filterFunc.bind(this);
	}
	getData(page) {

			//ready to fetch data
			let author=localStorage.getItem('Auth');
			let url= '/data/page/'+page;
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
				if(res.status === 'success' && 
					res.nextpage !== this.state.page){
					let dataTable = JSON.parse(res.data);
					this.setState({
					table:this.state.table.concat(dataTable),
					page: res.nextpage,
					hasMoreItem: true});
				}
				else {
					this.setState({hasMoreItem:false});
				}
			}
			)
			.catch(e=>{
				this.setState({hasMoreItem:false});
			});   
		}

	loadFunc(){
		this.getData(this.state.page);
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
	WaitingLoading(){
		this.setState({hasMoreItem:false})
		setTimeout(function() { //Start the timer
	      this.setState({hasMoreItem:true});
		  }.bind(this), 100000); 
	}
render() {

		let rowvalue = this.state.table.length >0 ?
		this.writeRow(this.state.table):
		 <tr><td></td></tr>

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
			loader={
			<div className="loader" 
			key={0}>Loading ...</div>
			}
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
			);
	}
}

export default Tables;
