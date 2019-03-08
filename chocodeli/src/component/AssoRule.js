import React, {PureComponent} from "react";
import PropTypes from "prop-types"
import {Table} from "react-bootstrap";
class AssoRule extends PureComponent {
	constructor(props) {
		super(props);
		this.state={
			Data:this.props.Data
		}
	}
componentWillReceiveProps(nextProps){ 
  if(nextProps.Data !== this.props.Data)
    this.setState({showcontent: nextProps.Data});

}
	render(){

		return (
			
			<Table responsive>
			<thead>
			<tr>
			<th>Buy Product</th>
			<th scope="col">Recomend Product</th>
			</tr>
			</thead>
			<tbody>
			{	

				this.state.Data.map((record,index )=>(
					<tr key={index}>
						<td>
						{record.fist.map((item,i) => (
							<div key={i}>{item}</div>
							))}
						</td>

						<td key={"tdn"+index}>
						{record.next.map((item,i) => (
							<div key={i}>{item}</div>
							))}
						</td>
					</tr>
					))
			}
			</tbody>
			</Table>
			
			)
		}};
		AssoRule.propTypes = {
			fistItem: PropTypes.array,
			nextItem: PropTypes.array
		};
		export default AssoRule;