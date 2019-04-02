import React, {PureComponent} from "react";
import Loading from "./Loading";
import Infomation from "./Infomation";
import '../style/chill.css';
import Content from "./Content";
import Problem from "./Problem";
class Apiori extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      result: [],
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
      this.getData();
    }
  }
  setDataToState(){
    let tempdata= localStorage.getItem('apiori');
      tempdata=JSON.parse(tempdata);
      this.setState({result:tempdata.rules,
        min_sup:tempdata.min_sup,
        min_conf:tempdata.min_conf});
  }
  getData() {
    //http://localhost:5000/api/apiori?minsup=0.45&minconf=0.2
    fetch(`http://localhost:5000/api/apiori?minsup=${this.state.min_sup}`+
      `&minconf=${this.state.min_conf}`+
      `&minlen=${this.state.min_len}`)
    .then(res=>res.json())
    .then(result=>
    {
      localStorage.setItem("apiori",JSON.stringify(result));
      this.setDataToState();
    }
    )
    .catch(e=>e);   
    console.log("err in fetch at apiori");

  }

  render(){ 
    if(this.state.result.length>0){
    return (   

      <div id="content">
 <Infomation Content1={"Algorthm: Fpgrowth"}
      Content2={"min support: "+ this.state.min_sup}
      Content3={"min confident: "+this.state.min_conf}/>
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