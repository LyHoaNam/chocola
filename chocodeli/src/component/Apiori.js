import React, {PureComponent} from "react";
import Loading from "./Loading";
import Infomation from "./Infomation";
import '../style/chill.css';
import Content from "./Content";
class Apiori extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      result: [],
      min_conf: this.props.min_conf,
      min_sup:this.props.min_supf
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
    fetch('http://localhost:5000/api/apiori')
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
      <Infomation Algorthm={"Size file: "}
      minCof={"Column: "}
      minSup={"Row: "}/>
      <Content data={this.state.result}/>
    
      </div>
      )
    }
    else
      return <Loading />

  }
}
export default Apiori;