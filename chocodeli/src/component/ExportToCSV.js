import React,{PureComponent} from "react";
import { CSVLink } from "react-csv";
class ExportToCSV extends PureComponent {

	render(){
		return(
			<span className="customPrtnCSV">
			{
				this.props.data !== ''?
				<CSVLink data={this.props.data}
				filename={"Chocola.csv"} 
				target="_blank">
				    Export CSV
				</CSVLink>: ''
			}
			</span>
			)
	}
}
export default ExportToCSV;