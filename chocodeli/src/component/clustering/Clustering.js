import React, {PureComponent} from "react";
import "./clustering.css";
import NumberOfClusters from "./NumberOfClusters";
import DefineClusters from "./DefineClusters";
import TableClustering from "./TableClustering";
class Clustering extends PureComponent {

	render(){
		return(
			<div id="content" className="row left15">
			<NumberOfClusters />
			<DefineClusters />
			<TableClustering />
			</div>
			)
	}
}
export default Clustering;