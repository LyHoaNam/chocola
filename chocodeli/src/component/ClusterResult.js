import React, {PureComponent} from "react";
import "../style/main.css";
import Menulist from "./Menulist";
import Loading from "./Loading";
import Clustering from "./clustering/Clustering";
class Result extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: null, 
      listAl: null,
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

      this.setState ({
      listAl:tempdata.ChooseAl,
      col1: tempdata.yaxits,
      col2: tempdata.xaxits})

  }
  
  render() {
    if(this.state.listAl){
      return (
        <div className="containtPredit">
        <div className="row marginright0">
        <div className='col-lg-2 paddingLeft0'>
        <div className='Listmenu'>
       <Menulist key={'menulistCluster'} 
            algorthm='K mean' 
        />

        </div>
        </div>
        <div className="col-lg-10 pading0">
        <Clustering
        col1 = {this.state.col1}
        col2 = {this.state.col2}
        />
        </div>
        </div>
        </div>
        )      
    }
    else return <Loading />
  }
};
export default Result;