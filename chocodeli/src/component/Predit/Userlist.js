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
        authorization:"",
        selectuser:'' 
			
		}
    this.selectValue=this.selectValue.bind(this);
	}
	 componentDidMount () {
    if(localStorage.getItem('usercol')){
      this.setDataToState();  
    }
    else{
      let author=localStorage.getItem('Auth');
      this.setState({authorization:author});
      this.getData(author);
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

 getData(bearer) {
    let column = '?col='+this.state.usercol;
    let url= '/predit/knnbasic/unique'+column;
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
          localStorage.setItem("usercol",JSON.stringify(res));
          this.setDataToState();}
      }
      )
      .catch(e=>{
        console.log(e);
      });  
  }
  selectValue(value){
    this.props.callbackFromUser(value);
  }
	render(){
		return(
		<div className="col-lg-2">
     	
    {
      this.state.user ?
      <List 
        data={this.state.user}
        colName="user"
        callbackValue={this.selectValue}/>: ""
    }
      </div>
			)
    
	}
}
export default UserList;