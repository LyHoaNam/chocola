import React, {PureComponent} from "react";
import "../style/main.css";
import AssociationRule from "./AssociationRule";
import Menulist from "./Menulist";
import Loading from "./Loading";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
class Result extends PureComponent {
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
  writeRoute(list){
    let result=[];
    list.map((Name,index)=>{
      Name==="fpgrowth" || Name ==="apiori" ?
      result.push(
        <Route key={index} path={'/algorthm/'+Name}
          render={(props)=><AssociationRule {...props} 
           min_conf={this.state.min_conf}
           min_supf={this.state.min_supf}
           algorthm={Name} />} />
        ): '';
    })

    return result;
  }
  render() {
    if(this.state.listAl){
      let list = [];
      list=this.state.listAl;
      console.log('list',list);
      let routes = this.writeRoute(list);
    return (
    <Router>
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
      {
      
        <AssociationRule 
           min_conf={this.state.min_conf}
           min_supf={this.state.min_supf}
           algorthm={'apiori'} />
      }
      <Switch>
          {routes}        
      </Switch>
      </div>
      </div>
      </div>
    </Router>
    )      
    }
    else return <Loading />
  }
};
export default Result;