import React, {PureComponent} from "react";
import "../style/chill.css";

class ChooseAlgorthm extends PureComponent {
	constructor(props) {
		super(props);
        this.state ={
      Name: null,
      NumberCom: 0,
      showRule:'displayNone',
      Apyori: false,
      fpgrowth:false

    }
	}
	render(){
    let ShowAssoRule = ()=> this.setState({showRule:"displayBlock",Apyori:true, fpgrowth:true});
    let CheckApyori = ()=>this.setState({Apyori:!this.state.Apyori});
    let CheckFpgrowth = ()=>this.setState({fpgrowth:!this.state.fpgrowth});
    
		return (
      <div>
      <div className="FontTitle">
      Choose Algorthm
      </div>
      <div>
      <label className="containerRadio"
      onChange={ShowAssoRule}>Association rules
      <input type="radio"  name="radio"/>
      <span className="checkmarkdot"></span>
      </label>
      <div className={"ContainCheckbox " +this.state.showRule}>
        <label className="Btncontainer"
        onChange={CheckApyori}>Apyori
        <input type="checkbox"  name="apyori" checked=
        {this.state.Apyori} />
        <span className="checkmark"></span>
        </label>
        <label className="Btncontainer"
        onChange={CheckFpgrowth}>Fpgrowth
        <input type="checkbox"  name="fpgrowth" checked=
        {this.state.fpgrowth}/>
        <span className="checkmark"></span>
        </label>
      </div>
      </div>
      </div>
			    
			)
	}
}
export default ChooseAlgorthm;
