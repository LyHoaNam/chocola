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
      this.getData();
    }
  }
  
   setDataToState(){
    let tempdata= localStorage.getItem('itemcol');
      tempdata=JSON.parse(tempdata);
      this.setState({item:tempdata});
  }
 getData() {
  if(sessionStorage.getItem('name_data')) {
    let nameData = sessionStorage.getItem('name_data');
    let url=`http://localhost:5000/api/uniqueitem?`+
      `item=${this.state.itemcol}`+
      `&filename=${nameData}`;
    fetch(url)
    .then(res=>res.json())
    .then(result=>
    {
      localStorage.setItem("itemcol",JSON.stringify(result));
      this.setDataToState();
    }
    )
    .catch(e=>e);   
    console.log("err in fetch at ItemList (Predit)");
  }
}
    selectValue(value){
    this.props.callbackFromItem(value);
  }

	render(){
    if(this.state.item)
    {
		return(
		<div className="col-lg-3">
     	
    <List 
    data={this.state.item}
    colName="item"
    callbackValue={this.selectValue}/>
      </div>
			)
    }
     else
     { return <Problem />}
	}
}
export default ItemsList;