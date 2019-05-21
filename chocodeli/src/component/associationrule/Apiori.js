import React, {PureComponent} from "react";
import '../../style/chill.css';
import Content from "./Content";
import Problem from "../Problem";
class Apiori extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      result: [],
      authorization:"",
      min_conf: this.props.min_conf,
      min_sup:this.props.min_supf,
      min_len:this.props.min_len
    }
    
  }
  componentDidMount () {
    if(localStorage.getItem('apiori')){
      this.setDataToState();  
    }
    else{
      let author=localStorage.getItem('Auth');
      this.setState({authorization:author});
      this.getData(author);
    }
  }
  setDataToState(){
    let tempdata= localStorage.getItem('apiori');
      tempdata=JSON.parse(tempdata);
      this.setState({result:tempdata});
  }
  getData(bearer) {
    let minlen = '?minlen='+this.state.min_len;
    let minsup = '&minsup='+this.state.min_sup;
    let minconf = '&minconf='+this.state.min_conf;
    let url= '/rule/apiori/result'+minlen+minsup+minconf;
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
        if(res.rules)
          {localStorage.setItem("apiori",JSON.stringify(res.rules));
          this.setDataToState();}
      }
      )
      .catch(e=>{
        console.log(e);
      });  
  }

  render(){
    if(this.state.result){
    return (   

      <div id="content">
      <Content data={this.state.result}/>
    
      </div>
      )
    }
    else
      return (
      <Problem/>
    )

  }
}
export default Apiori;