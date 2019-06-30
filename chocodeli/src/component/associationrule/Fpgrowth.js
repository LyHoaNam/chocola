import React, {PureComponent} from "react";
import '../../style/chill.css';
import Content from "./Content";
import ChartForRule from "./ChartForRule";
class Fpgrowth extends PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      result: [],
      authorization:"",
      min_conf: this.props.min_conf,
      min_len:this.props.min_supf,
      time: 0,
      len: 0,
      str_col:this.props.str_col
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
      let arrRule = tempdata['rules'];
      this.setState({result:arrRule,
            time:tempdata.time,
            len:tempdata.len});
  }
 getData(bearer) {
    let row = parseFloat(sessionStorage.getItem('row'));
    let real_len = Math.round(row * this.state.min_len);
    let minlen = '?minlen='+real_len;
    let minconf = '&minconf='+this.state.min_conf;
    let strcol = '&sel_col='+this.state.str_col
    let url= '/rule/fpgrowth/result'+minlen+minconf+strcol;
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
          localStorage.setItem("fpgrowth",JSON.stringify(res));
          this.setDataToState();}
      }
      )
      .catch(e=>{
        console.log(e);
      });  
  }

  render(){ 
    return (   

      <div id="content" className="row">
      {
        this.state.result.length > 0?
        <Content data={this.state.result}/>:
        ""  
      }
      <div className="col-lg-4">
      <div className="Infomation">
      <div className="spaceInfo">
      <span className="textInfo">
      time to run: 
      </span>
      <span className="explainInfo">
      {this.state.time}
      </span>
      </div>
      <div className="spaceInfo">
      <span className="textInfo">
      result length: 
      </span>
      <span className="explainInfo">
      {this.state.len}
      </span>
      </div>
      </div>
      <ChartForRule />
      </div>
      </div>
      )

  }
}
export default Fpgrowth;