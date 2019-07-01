import React, {PureComponent} from "react";
import "./clustering.css";
import DetailTable from "./DetailTable";
import ExportToCSV  from "../ExportToCSV";
class TableClustering extends PureComponent {
	render(){
		return(
			<div className="col-lg-12">
			<div className="ContainTableClusteing">
			<div className="ExportCsvDiv">{
				this.props.Table.length >0 ?

					<ExportToCSV data={this.props.Table}/>: ""
				}
			</div>
			<div className="TableCluster">
			{
				this.props.Table !== ''?
				this.props.Table.map((records,index)=>
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
			</div>
			)
	}
}
export default TableClustering;