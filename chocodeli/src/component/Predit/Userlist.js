import React, {PureComponent} from "react";
import "../style/chill.css";

class Predit extends PureComponent {
	constructor(props) {
		super(props){
			this.state = {
				usercol=this.props.user
			}
		}
	}
	 componentDidMount () {
    if(localStorage.getItem('usercol')){
      this.setDataToState();  
    }
    else{
      this.getData();
    }
  }
  
   setDataToState(){
    let tempdata= localStorage.getItem('usercol');
      tempdata=JSON.parse(tempdata);
      this.setState({usercol:tempdata);
  }

 getData() {
    fetch(`http://localhost:5000/api/`+
    	`uniqueuser?user=${this.state.usercol}`)
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
	render(){
		return(
		<div id="col-lg-4">
     	
    
      </div>
			)
	}
}
export default Predit;