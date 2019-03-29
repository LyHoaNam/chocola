import React, {PureComponent} from "react";
import Loading from "./Loading";
import Infomation from "./Infomation";
import '../style/chill.css';
import Title from "./Title";
import Content from "./Content";
class AssociationRule extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      result: [],
      min_conf: this.props.min_conf,
      min_sup:this.props.min_supf,
      algorthm:this.props.algorthm
    }
    
  }
  componentWillReceiveProps(nextProps){ 
  if(nextProps.algorthm !== this.props.algorthm)
    this.setState({algorthm: nextProps.algorthm});

}
  checklocalStorage(algo){
    console.log('algo',algo);
      if(localStorage.getItem(algo)){
      this.setDataToState(algo);  
    }
    else{
      this.getData(algo);
    }
  }
  componentDidMount () {
    if(this.props.location){
      this.setState({algorthm:this.props.location.algo});
      this.checklocalStorage(this.state.algorthm);
      }
    else{
        let algo = this.state.algorthm;
        this.checklocalStorage(algo);
      }
  }
  setDataToState(al){
    let tempdata= localStorage.getItem(al);
      tempdata=JSON.parse(tempdata);
      this.setState({result:tempdata.rules,
        min_sup:tempdata.min_sup,
        min_conf:tempdata.min_conf});
  }
  getData(al) {
    fetch(`http://127.0.0.1:5000/api/${al}`)
    .then(res=>res.json())
    .then(result=>
    {
      localStorage.setItem(al,JSON.stringify(result));
      this.setDataToState();
    }
    )
    .catch(e=>e);   
    console.log("err");

  }

  render(){ 
    
    if(this.state.result.length>0){
      let result =this.state.result;
      console.log(result);
    return (   

      <div id="content">


      <Infomation Algorthm={"Size file: "}
      minCof={"Column: "}
      minSup={"Row: "}/>

      <Content Data={result}/>
      </div>
      )
    }
    else
      return <Loading />

  }
}
export default AssociationRule;