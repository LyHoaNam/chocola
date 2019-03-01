import React, {PureComponent} from "react";
import PropTypes from "prop-types"

class ItemResult extends PureComponent {
	render(){

		return (
			<tr key={this.props.keyindex}>
			<td className="padleft50">
			{this.props.fistItem.map((item,index) => (
				<div key={index}>{item}</div>
				))}
			</td>
			<td key={"tdn"+this.props.keyindex}>
			{this.props.nextItem.map((item,index) => (
				<div key={index}>{item}</div>)
			)}
			</td>
			</tr>
			);
	}
}
ItemResult.propTypes = {
	fistItem: PropTypes.array,
	nextItem: PropTypes.array
};
export default ItemResult;