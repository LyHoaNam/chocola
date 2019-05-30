import React, {PureComponent} from "react";
import "./clustering.css";
import {Table} from "react-bootstrap";
class TableClustering extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			Origin: null,
			ruler:10
		}
	}
	setupTable(items){
		let GroupType = {};
		let result = [];
		if(items.length >0)
		{GroupType = items.reduce((typeSoFar, { type, x, y }) => {
					if (!typeSoFar[type]) 
						typeSoFar[type] = [];
					else {
						let tempArr = [];
						tempArr.push(x);
						tempArr.push(y);
						typeSoFar[type].push(tempArr);}
					return typeSoFar;
				}, {});
		}
		return GroupType;
	} 
	writeFunc(Data){
    let result=[];
    if(Data.length>0)
      {Data.slice(0,10).map((record,index)=>
        {     
          result.push(  
          <tr key={index}>
          <td key={'i'+index}> {record[0]} </td>
          <td key = {'d'+index}>
          {record[1]}
          </td>
          </tr>
          )
    })}
    return result;
  }
	render(){
		console.log(this.setupTable(this.props.DataTable));
		return(
			<div className="col-lg-12">
			<div className="ContainTableClusteing">
			<Table responsive>
			<tbody striped="true">
			
			</tbody>
			</Table>
			</div>
			</div>
			)
		}
	}
	export default TableClustering;