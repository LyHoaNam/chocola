import React, {PureComponent} from "react";
import '../style/chill.css';

import Menulist from "./Menulist";
import Loading from "./Loading";
class Test extends PureComponent {
  constructor(props) {
    super(props);
 this.state = {
      result: null, 
      min_conf: null,
      min_sup:null,
      listAl: null
    };
    
  }
 
  componentDidMount () {
    let urltest=this.props.match.params.id;
    console.log('urltest',urltest);
        if(urltest!=='')
        console.log("test",this.props.match.params.id);
      else
    console.log('test/');
    //check session exist?
    if(sessionStorage.getItem('datasend')) {
      this.setDatasend();
    }
    else{
      sessionStorage.setItem('datasend',
        JSON.stringify(this.props.location.datasend));
      this.setDatasend();
    }
  }
  setDatasend(){
    //set state
    let tempdata=sessionStorage.getItem('datasend');
    tempdata=JSON.parse(tempdata);
    this.setState({min_conf:tempdata.min_conf,
      min_sup:tempdata.min_supf,
      listAl:tempdata.ChooseAl})
  }
  render(){ 

      if(this.state.listAl){
      let list = [];
      list=this.state.listAl;
      return (

        <div className="containtAlG">
        <div className="row">
        <div className='col-lg-3'>
        <div className='Listmenu'>
        {

          list.map((Name,index)=>  
            <Menulist key={index} 
            algorthm={Name} 
            min_conf={this.state.min_conf}
            min_supf={this.state.min_supf}/>

            )
        }

        </div>
        </div>
        <div className="col-lg-9">

        </div>
        </div>
        </div>

        )      
    }
    else return <Loading />
}
}
export default Test;