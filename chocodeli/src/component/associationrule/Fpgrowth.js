import React, {PureComponent} from "react";
import '../../style/chill.css';
import Content from "./Content";
import Problem from "../Problem";
class Fpgrowth extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      result: [],
      authorization:"",
      min_conf: this.props.min_conf,
      min_len:this.props.min_len
    }
    
  }
  componentDidMount () {
      if(localStorage.getItem('fpgrowth')){
      this.setDataToState();  
    }
    else{
      let author=localStorage.getItem('Auth');
      this.setState({authorization:author});
      this.getData(author);
    }
  }
  setDataToState(){
    let tempdata= localStorage.getItem('fpgrowth');
      tempdata=JSON.parse(tempdata);
      this.setState({result:tempdata});
  }
 getData(bearer) {
    let minlen = '?minlen='+this.state.min_len;
    let minconf = '&minconf='+this.state.min_conf;
    let url= '/rule/fpgrowth/result'+minlen+minconf;
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
        if(res.rules){
          localStorage.setItem("fpgrowth",JSON.stringify(res.rules));
          this.setDataToState();}
      }
      )
      .catch(e=>{
        console.log(e);
      });  
  }

  render(){ 
    
    if(this.state.result.length>0){
    return (   

      <div id="content">
      <Content data={this.state.result}/>
    
      </div>
      )
    }
    else
      return <Problem />

  }
}
export default Fpgrowth;