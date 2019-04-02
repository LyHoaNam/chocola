import React, {PureComponent} from "react";
import Loading from "./Loading";
import Infomation from "./Infomation";
import '../style/chill.css';
import Content from "./Content";
import Problem from "./Problem";
class Fpgrowth extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      result: [],
      min_conf: this.props.min_conf,
      min_len:this.props.min_len
    }
    
  }
  componentDidMount () {
    if(localStorage.getItem('fpgrowth')){
      this.setDataToState();  
    }
    else{
      this.getData();
    }
  }
  setDataToState(){
    let tempdata= localStorage.getItem('fpgrowth');
      tempdata=JSON.parse(tempdata);
      this.setState({result:tempdata.rules,
        min_len:tempdata.min_len,
        min_conf:tempdata.min_conf});
  }
  getData() {
    fetch(`http://localhost:5000/api/fpgrowth?minlen=${this.state.min_len}`+
      `&minconf=${this.state.min_conf}`)
    .then(res=>res.json())
    .then(result=>
    {
      localStorage.setItem("fpgrowth",JSON.stringify(result));
      this.setDataToState();
    }
    )
    .catch(e=>e);   
    console.log("err in fetch at fpgrowth");

  }

  render(){ 
    
    if(this.state.result.length>0){
    return (   

      <div id="content">
      <Infomation Content1={"Algorthm: Fpgrowth"}
      Content2={"min support: "+ this.state.min_len}
      Content3={"min confident: "+this.state.min_conf}/>
      <Content data={this.state.result}/>
    
      </div>
      )
    }
    else
      return <Problem />

  }
}
export default Fpgrowth;