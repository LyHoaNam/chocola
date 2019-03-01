import React, {PureComponent} from "react";
import PropsTypes from "prop-types";
import "../style/main.css";
import ItemResult from "./ItemResult";
class Result extends PureComponent {
  constructor(props) {
    super(props);
    this.filterItem=this.filterItem.bind(this);
  }
  filterItem() {
    if(this.props.textChange === "")
      return this.props.rule;
    else {
      let olrule=this.props.rule;
      let toSearch =this.props.textChange;
      let filrule =[];
      for(let i=0;i<olrule.length;i++) {
        for (let key in olrule[i])
          if(olrule[i][key].indexOf(toSearch)!==-1)
          filrule.push(olrule[i])
      }
      return filrule;
    }
  }
  render() {
    let rule={};
    rule= this.filterItem();
    return (
      <div id="content">
      <div className="row">
      <div className="col-lg-12">
      
      <table className="table padleft">
      <thead >
      <tr>
        <th scope="col" className="padleft50">Buy Product</th>
        <th scope="col">Recomend Product</th>
      </tr>
      </thead>

      <tbody>
        {	
          
        	rule.map((item,index )=>(
            
            
            <ItemResult 
            key={"itemResult"+index}
            keyindex={index}
            fistItem={item.fist}
            nextItem={item.next}/>
            
          	)
        	)}
      </tbody>

      </table>
      </div>
      </div>
      </div>

      );

  }
}
Result.propType = {
	rule: PropsTypes.array
};
export default Result;