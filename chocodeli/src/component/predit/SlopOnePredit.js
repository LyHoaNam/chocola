import React, {PureComponent} from "react";
import "../../style/chill.css";
import "./predit.css";
import Userlist from "./Userlist";
import ItemsList from "./ItemsList";
import Rating from "./Rating";
import RawData from "./RawData";
import FromTo from "./FromTo";
class NmfPredit extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      selectUser:'',
      selectItem:''
    }
    this.callbackUser = this.callbackUser.bind(this);
    this.callbackItem = this.callbackItem.bind(this);
  }
  callbackUser(value){
    if(value !=='')
      this.setState({selectUser:value});
  }
  callbackItem(value){
    if(value !== ''){
      this.setState({selectItem:value});
    }
  }
	render(){
		return(
		<div id="content">
      <div className="preditContent">
     <Userlist data={this.props.user}
     callbackFromUser={this.callbackUser}/>

    <ItemsList data={this.props.item}
    callbackFromItem={this.callbackItem}/>
    
    <Rating colUser={this.props.user}
    algorithm="SlopeOne"
    colItem={this.props.item}
    colRating={this.props.rating}
    selectItem={this.state.selectItem}
    selectUser={this.state.selectUser}/>
    <RawData 
    colUser={this.props.user}
    colItem={this.props.item}
    colRating={this.props.rating}/>
    <FromTo 
    algorithm="SlopeOne"
    colUser={this.props.user}
    colItem={this.props.item}
    colRating={this.props.rating}/>
    </div>
      </div>
			)
	}
}
export default NmfPredit;