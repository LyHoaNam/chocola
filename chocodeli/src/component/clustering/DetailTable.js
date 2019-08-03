import React, {PureComponent} from "react";
import "./clustering.css";
import {Table} from "react-bootstrap";
class DetailTable extends PureComponent {
	render(){
		return(
			<Table responsive>
			<thead>
			<tr>
			<th>
			#
			</th>
			<th>
			X axis
			</th>
			<th>
			Y axis
			</th>
			</tr>
			</thead>
			<tbody striped="true">
			{
				this.props.Data ?
				this.props.Data.map((records,index)=>(
					<tr key={index}>
					<td key={'td'+index}>{index+1}</td>
					{
						records.map((item,i)=>
							<td key={i}>{item}</td>)
					}
					</tr>
					))
				: <tr></tr>
			}
			</tbody>
			</Table>
			)
	}
}
export default DetailTable;