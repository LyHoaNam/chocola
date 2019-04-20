import React, {PureComponent} from "react";
import "../../style/chill.css";
import List from "./List";
import Problem from "../Problem"
class UserList extends PureComponent {
	constructor(props) {
		super(props)
			this.state = {
				usercol:this.props.data,
        user:false,
        selectuser:'' 
			
		}
    this.selectValue=this.selectValue.bind(this);
	}
	 componentDidMount () {
    if(localStorage.getItem('usercol')){
      this.setDataToState();  
    }
    else{
      this.getData();
    }
  }
  //componentWillUpdate(){
  //  let value=this.state.selectuser;
  //  console.log('userlist',value);
//this.props.callbackFromUser(value);
 /// }
  
   setDataToState(){
    let tempdata= localStorage.getItem('usercol');
      tempdata=JSON.parse(tempdata);
      this.setState({user:tempdata});
  }

 getData() {
    fetch(`http://localhost:5000/api/uniqueuser?user=${this.state.usercol}`)
    .then(res=>res.json())
    .then(result=>
    {
      localStorage.setItem("usercol",JSON.stringify(result));
      this.setDataToState();
    }
    )
    .catch(e=>e);   
    console.log("err in fetch at UserList (Predit)");
  }
  selectValue(value){
    this.props.callbackFromUser(value);
  }
	render(){
    if(this.state.user)
    {
		return(
		<div className="col-lg-3">
     	
    <List 
    data={this.state.user}
    colName="user"
    callbackValue={this.selectValue}/>

      </div>
			)
    }
     else
      return <Problem />
	}
}
export default UserList;