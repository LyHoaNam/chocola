import React, {PureComponent} from "react";
import "../style/main.css";
import Menulist from "./Menulist";
import Loading from "./Loading";
import Apiori from "./Apiori";
import Fpgrowth from "./Fpgrowth";
import Predit from "./predit/Predit";
class Result extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: null, 
      min_conf: null,
      min_sup:null,
      min_len:null,
      listAl: null,
      user: null,
      rating: null,
      item: null
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
    //get data from Next Algorthm and setState
    let tempdata=sessionStorage.getItem('datasend');
    tempdata=JSON.parse(tempdata);
    let nameAlgorthm = this.props.match.params.id;
    if(nameAlgorthm === 'fpgrowth' || nameAlgorthm =='apiori')
    {
    this.setState({min_conf:tempdata.min_conf,
      min_sup:tempdata.min_supf,
      min_len:tempdata.min_len,
      listAl:tempdata.ChooseAl}) }
    if(nameAlgorthm === 'predit') {
      this.setState ({user: tempdata.user,
      listAl:tempdata.ChooseAl,
      item: tempdata.item,
      rating: tempdata.rating})
    }
  }
  writeContent(){
    //write result of algorthm
    let nameAlgorthm = this.props.match.params.id;
    switch(nameAlgorthm){
      case 'fpgrowth':
      return  <Fpgrowth 
      min_conf= {this.state.min_conf} 
       min_supf= {this.state.min_sup}
       min_len={this.state.min_len}/>;
      case 'apiori':
      return <Apiori 
      min_conf = {this.state.min_conf} 
      min_supf = {this.state.min_sup}
      min_len={this.state.min_len}/>;
      case 'predit':
      return <Predit 
      user = {this.state.user}
      item = {this.state.item}
      rating= {this.state.rating} />
      default:
       return 'err some thing';
    }

  }

  render() {
    /*
    //check size of localStorage
    var _lsTotal=0,_xLen,_x;
    for(_x in localStorage)
      { if(!localStorage.hasOwnProperty(_x)){continue;} 
      _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};
      console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
      */
    if(this.state.listAl){
      let listAlgorthm=this.state.listAl;
      //get id from url

      let showcontent = this.writeContent();
      return (
        <div className="containtAlG">
        <div className="row marginright0">
        <div className='col-lg-2 paddingLeft0'>
        <div className='Listmenu'>
        {
          listAlgorthm.map((Name,index)=>  
            {
              
              <Menulist key={index} 
                        algorthm={Name} 
                        min_conf={this.state.min_conf}
                        min_supf={this.state.min_sup}
                        min_len={this.state.min_len}/>}

            )
            
        }

        </div>
        </div>
        <div className="col-lg-10 pading0">
        {showcontent}
        </div>
        </div>
        </div>
        )      
    }
    else return <Loading />
  }
};
export default Result;