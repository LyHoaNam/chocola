import React, {PureComponent} from "react";
import "../style/main.css";
import PropTypes from "prop-types";
import AssoRule from "./AssoRule";
class Content extends PureComponent {
	constructor(props){
		super(props);
    this.state ={
      textChange: "",
      Show: this.props.Show,
      Data: this.props.Data
    }
        this.filterItem=this.filterItem.bind(this);
        this.handleChange=this.handleChange.bind(this);
	}
  componentWillReceiveProps(nextProps){ 
  if(nextProps.Show !== this.props.Show)
    this.setState({Show: nextProps.Show,
      Data: this.props.Data});

}
  handleChange(event) {
    this.setState({textChange:event.target.value});
  }
  filterItem() 
  {
    if(this.state.textChange === "")
      return this.props.Data;
    else {
      let olrule=this.props.Data;
      let filrule =[];
      for(let i=0;i<olrule.length;i++) {
        for (let key in olrule[i])
          if(olrule[i][key].indexOf(this.state.textChange)!==-1)
          filrule.push(olrule[i])
      }
      return filrule;
    }
  }
	render(){
    let data=this.filterItem();
		return (
	<div className="col-lg-12">
      <div className="Infomation martop10">
      <div className="DetailContent">
	      <span className="DetailInfo">
	      Result
	       </span>
	       <span className="SerachButton">
	        <input type="text" className="form-control"  placeholder="Search" 
            value={this.state.textChange} onChange={this.handleChange} />
	       </span>
	     </div>
	     <div className="OverFlow">
          <AssoRule Data={data}/>
      </div>
      </div>
      </div>

			)
	}
};
Content.propTypes = {
  data: PropTypes.array
};
export default Content;