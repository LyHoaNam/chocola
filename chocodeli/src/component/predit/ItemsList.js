import React, {PureComponent} from "react";
import List from "./List";
import Problem from "../Problem"
class ItemsList extends PureComponent {
	constructor(props) {
		super(props)
			this.state = {
				itemcol:this.props.data,
        item:false,
        selectitem :''
			
		}
    this.selectValue=this.selectValue.bind(this);
	}
	 componentDidMount () {
    if(localStorage.getItem('itemcol')){
      this.setDataToState();  
    }
    else{
      let author=localStorage.getItem('Auth');
      this.setState({authorization:author});
      this.getData(author);
    }
  }
  
   setDataToState(){
    let tempdata= localStorage.getItem('itemcol');
      tempdata=JSON.parse(tempdata);
      this.setState({item:tempdata});
  }
getData(bearer) {
    let column = '?col='+this.state.itemcol;
    let url= '/predit/knnbasic/unique'+column;
    console.log(url);
      let options = {
        method: 'GET',
        headers: {
          'Authorization': bearer
        }
      }
      fetch(url,options)
      .then(res=>res.json(  ))
      .then(res=>
      {
        if(res){
          localStorage.setItem("itemcol",JSON.stringify(res));
          this.setDataToState();}
      }
      )
      .catch(e=>{
        console.log(e);
      });  
  }
    selectValue(value){
    this.props.callbackFromItem(value);
  }

	render(){
		return(
		<div className="col-lg-2">
     	
    {
      this.state.item ?
      <List 
        data={this.state.item}
        colName="item"
        callbackValue={this.selectValue}/>:""}
      </div>
			)
	}
}
export default ItemsList;