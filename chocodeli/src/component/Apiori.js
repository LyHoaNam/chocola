import React, {PureComponent} from "react";
import Loading from "./Loading";
import Infomation from "./Infomation";
import '../style/chill.css';
import Title from "./Title";
import Tables from "./Tables";
class Apiori extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      result: [],
      min_conf: 0,
      min_sup:0
    }
    
  }
  componentDidMount () {
    if(localStorage.getItem('Apiori')){
      this.setDataToState();  
    }
    else{
      this.getData();
    }
  }
  setDataToState(){
    let tempdata= localStorage.getItem('Apiori');
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
      localStorage.setItem("Apiori",JSON.stringify(result));
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

      <Tables data={this.state.result}/>
      </div>
      )
    }
    else
      return <Loading />

  }
}
export default Apiori;