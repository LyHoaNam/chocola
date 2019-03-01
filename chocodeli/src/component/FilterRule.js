import React, {PureComponent} from "react";
import "../style/main.css"

class FilterRule extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			newRule: null
		};
	}
	componentDidMount(){
		
		let toSearch = this.props.Filkey;
		let rule = this.props.rule;
		
		if(rule !== null){
		for(let i=0;i<rule.length;i++)
			{ 
				if(rule[i].fist.indexOf(toSearch)!==-1)
					this.setState({newRule:rule[i]});
		
			}
		}
		
	}

	render(){
		if(this.state.newRule !==null){
			return (
				<div>
				<table className="table">
				<thead>
				<tr>
				<th scope="col">
					Product Name
				</th>
				</tr>
				</thead>
				<tbody>
				<tr>
				<td>
				{this.props.Filkey}
				</td>
				</tr>
				</tbody>
				</table>

				<table className="table">
				<thead>
				<tr>
				<th scope="col">
					Recomend Product
				</th>
				</tr>
				</thead>
				
				<tbody>
				
				{
					this.state.newRule.next.map(
						(item,index)=>(
							<tr key={"tr"+index}>
							<td key={"pd"+index}>
							{item}
							</td>
							</tr>
							))
				}
				
				
				</tbody>
				</table>
				</div>
			);

	};
	 return <p>{this.props.Filkey} "not rule"</p>;
}
}
export default FilterRule;
