import React, {PureComponent} from "react";
import "./clustering.css";
import {Table} from "react-bootstrap";
class TableClustering extends PureComponent {
	render(){
		return(
			<div className="col-lg-12">
			<div className="ContainTableClusteing">
			<Table responsive>
			<tbody striped="true">
			<tr>	
			<td >
			a
			</td>
			<td >
			a
			</td>
			</tr>
			</tbody>
			</Table>
			</div>
			</div>
			)
	}
}
export default TableClustering;