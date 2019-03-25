import React, { PureComponent } from "react";
import '../style/chill.css';
import {Table} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroller';
class Tables extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			ruler:30,
			hasMoreItem:true,
			inputValue: '',
			table: this.props.data.slice(0,30)
		}
		this.loadFunc = this.loadFunc.bind(this);
		this.filterFunc = this.filterFunc.bind(this);
	}

	loadFunc(){
		let limit = this.props.data.length;
		let startpoint = this.state.ruler;
		let endpoint = startpoint+30>limit ? limit: startpoint+30;
		let tables =this.props.data.slice(0,endpoint);
		this.setState({table:tables,
			ruler:endpoint});

	}
	filterFunc(e){
		let masterData = this.props.data;
		let toSearch= e.target.value;
		let searchData = [];
		for(let i=0;i<masterData.length;i++)
			{ 
				if(masterData[i].indexOf(toSearch)!==-1)
					searchData.push(masterData[i]);
			}
		this.setState({inputValue:toSearch,table:searchData});
	}
	writeFunc(){
		let result=[];
		this.state.table.map((record,index)=>
			{			
				result.push(	<tr key={index}>
				<td key={'i'+index}> {index+1} </td>
				{record.map((item,i)=>(
					<td key={i}>{item}</td>
					))
				}
			</tr>)})
		return result;
	}
	render() {
		let items=this.writeFunc();
		
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
				loader={<div className="loader" key={0}>Loading ...</div>}
				useWindow={false}
				>
				<Table responsive>
				<tbody striped="true">	
				{
					items
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
