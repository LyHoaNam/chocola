import React, {PureComponent} from "react";
import Loading from "./Loading";
import Infomation from "./Infomation";
import '../style/chill.css';
import Title from "./Title";
import Content from "./Content";
class Fpgrowth extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      result: [],
      min_conf: 0,
      min_sup:0
    }
    
  }
  componentDidMount () {
    if(localStorage.getItem('Fpgrowth')){
      this.setDataToState();  
    }
    else{
      this.getData();
    }
  }
  setDataToState(){
    let tempdata= localStorage.getItem('Fpgrowth');
      tempdata=JSON.parse(tempdata);
      this.setState({result:tempdata.rules,
        min_sup:tempdata.min_sup,
        min_conf:tempdata.min_conf});
  }
  getData() {
    fetch('http://localhost:5000/api/fpgrowth')
    .then(res=>res.json())
    .then(result=>
    {
      localStorage.setItem("Fpgrowth",JSON.stringify(result));
      this.setDataToState();
    }
    )
    .catch(e=>e);   
    console.log("err");

  }

  render(){ 
    
    if(this.state.result.length>0){
    return (   

      <div id="content">

      <Title title={"Your data"}/>

      <Infomation Algorthm={"Size file: "}
      minCof={"Column: "}
      minSup={"Row: "}/>

      <Content Data={this.state.result}/>
      </div>
      )
    }
    else
      return <Loading />

  }
}
export default Fpgrowth;