import React, {PureComponent} from "react";
import "../style/main.css";
import Menulist from "./Menulist";
import Loading from "./Loading";
import Apiori from "./associationrule/Apiori";
import Fpgrowth from "./associationrule/Fpgrowth";
import KnnPredit from "./predit/KnnPredit";
import NmfPredit from "./predit/NmfPredit";
import SlopOnePredit from "./predit/SlopOnePredit";
import Clustering from "./clustering/Clustering";
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
      item: null,
      col1:null,
      col2:null,
      str_col: null
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
    if(nameAlgorthm === 'fpgrowth' || nameAlgorthm ==='apiori')
    {
    this.setState({min_conf:tempdata.min_conf,
      min_sup:tempdata.min_supf,
      min_len:tempdata.min_len,
      str_col:tempdata.str_col,
      listAl:tempdata.ChooseAl}) }
    if(nameAlgorthm === 'kmeans') {
      this.setState ({
      listAl:tempdata.ChooseAl,
      col1: tempdata.yaxits,
      col2: tempdata.xaxits})
    }
        if(nameAlgorthm === 'knn'||nameAlgorthm === 'nmf'
          || nameAlgorthm === 'slopeone') {
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
       min_len={this.state.min_len}
       str_col={this.state.str_col}/>;
      case 'apiori':
      return <Apiori 
      min_conf = {this.state.min_conf} 
      min_supf = {this.state.min_sup}
      min_len={this.state.min_len}
      str_col={this.state.str_col}/>;
      case 'knn':
      return <KnnPredit 
      user = {this.state.user}
      item = {this.state.item}
      rating= {this.state.rating} />;
      case 'nmf':
      return <NmfPredit 
      user = {this.state.user}
      item = {this.state.item}
      rating= {this.state.rating} />;
      case 'slopeone':
      return <SlopOnePredit 
      user = {this.state.user}
      item = {this.state.item}
      rating= {this.state.rating} />;
      case 'kmeans':
      return <Clustering
      col1 = {this.state.col1}
      col2 = {this.state.col2}
      />
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

      let showcontent = this.writeContent();
      return (
        <div className="containtAlG">
        <div className="row marginright0">
        <div className='col-lg-2 paddingLeft0'>
        <div className='Listmenu'>
        {
          listAlgorthm.map((Name,index)=>  
              <Menulist key={index} 
                        algorthm={Name} 
                        />
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