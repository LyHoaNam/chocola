import React, {PureComponent} from "react";
import "./clustering.css";
import {Table} from "react-bootstrap";
import DetailTable from "./DetailTable";
class TableClustering extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			Table: ''
		}
	}
	componentDidMount(){
		this.getData();
	}
	getData() {
		let author=localStorage.getItem('Auth');
		let col1 = '?col1='+this.props.col1;
		let col2 = '&col2='+this.props.col2;
		let k_cluster = '&k='+this.props.NumberTable;
		let url= '/cluster/table'+col1+col2+k_cluster;
		console.log('cluster k', url);
		let options = {
			method: 'GET',
			headers: {
				'Authorization': author
			}
		}
		fetch(url,options)
		.then(res=>res.json(  ))
		.then(res=>
		{
			console.log('res',res);
			if(res.length >0)
				this.setState({Table:res});
		}
		)
		.catch(e=>{
			console.log(e);
		});  
	}
	render(){
		console.log('Table',this.state.Table);
		return(
			<div className="col-lg-12">
			<div className="ContainTableClusteing">
			{
				this.state.Table !== ''?
				this.state.Table.map((records,index)=>
					<div key={'div'+index}
					className="containTableDetail">
					<DetailTable key={index} 
					Data={records}/>
					</div>): ""
			}
			</div>
			</div>
			)
	}
}
export default TableClustering;