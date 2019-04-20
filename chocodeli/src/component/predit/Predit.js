import React, {PureComponent} from "react";
import "../../style/chill.css";
import "./predit.css";
import Infomation from "../Infomation";
import UserList from "./UserList";
import ItemsList from "./ItemsList";
import Rating from "./Rating";
class Predit extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      selectUser:'',
      selectItem:''
    }
    this.callbackUser = this.callbackUser.bind(this);
    this.callbackItem = this.callbackItem.bind(this);
    this.callbackUser = this.callbackUser.bind(this);
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
      <Infomation Content1={"Algorthm: Fpgrowth"}
      Content2={"min support: "}
      Content3={"min confident: "}/>
      <div className="preditContent">
     <UserList data={this.props.user}
     callbackFromUser={this.callbackUser}/>

    <ItemsList data={this.props.item}
    callbackFromItem={this.callbackItem}/>
    <Rating colUser={this.props.user}
    colItem={this.props.item}
    colRating={this.props.rating}
    selectItem={this.state.selectItem}
    selectUser={this.state.selectUser}/>
    </div>
      </div>
			)
	}
}
export default Predit;