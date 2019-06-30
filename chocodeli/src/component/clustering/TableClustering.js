import React, {PureComponent} from "react";
import "./clustering.css";
import DetailTable from "./DetailTable";
class TableClustering extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			Table: '',
			NumberTable: this.props.NumberTable
		}
	}
	componentWillReceiveProps(nextProps) {
	  if (nextProps.NumberTable !== this.state.NumberTable) {
	    this.setState({ NumberTable: nextProps.NumberTable },
	    	this.getData(nextProps.NumberTable));
 	 }
}
	componentDidMount(){
		this.getData(this.props.NumberTable);
	}
	getData(NumberTable) {
		let author=localStorage.getItem('Auth');
		let col1 = '?col1='+this.props.col1;
		let col2 = '&col2='+this.props.col2;
		let k_cluster = '&k='+ NumberTable;
		let url= '/cluster/table'+col1+col2+k_cluster;
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
			if(res.length >0)
				this.setState({Table:res});
		}
		)
		.catch(e=>{
			console.log(e);
		});  
	}
	render(){
		return(
			<div className="col-lg-12">
			<div className="ContainTableClusteing">
			{
				this.state.Table !== ''?
				this.state.Table.map((records,index)=>
					<div key={'div'+index}
					className="containTableDetail">
					<div className="titleTableCluster">
					{'Cluster '+ (index+1)}
					</div>
					<DetailTable key={index} 
					Thead = {index+1}
					Data={records}/>
					</div>): ""
			}
			</div>
			</div>
			)
	}
}
export default TableClustering;