import React, {PureComponent} from "react";
import "../style/main.css";
import Menulist from "./Menulist";
import Loading from "./Loading";
import PrintButton from "./PrintButton";
import Clustering from "./clustering/Clustering";
class Result extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: null, 
      listAl: null,
      col1:null,
      col2:null
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
      col1: tempdata.xaxits,
      col2: tempdata.yaxits})

  }
  
  render() {
    if(this.state.listAl){
      return (
        <div className="containtPredit">
        <div className="row marginright0">
        <div className='col-lg-2'>
        <div className='Listmenu'>
         <Menulist key={'menulistCluster'} 
              algorthm='/algorthm/kmeans' 
              algorthm='k means'
              linkto='/predit/kmeans'
          />
          <div className="containColSel">
          <div className="Infomation">
          <div className="DetailInfo">
          the columns you selected
          </div>
          <div className="colSelected" id="colSelected">
          column for x axits:
          <span className="nameCol">
          {this.state.col1}
          </span>
          </div>
          <div className="colSelected">
          column for y axits:
          <span className="nameCol">
          {this.state.col2}
          </span>
          </div>

          </div>
          </div>  
        </div>
        </div>
        <div className="col-lg-10">
        <div className="top50">
        <PrintButton id={"contentCluster"} 
        label={"Print pdf"} />
        <Clustering
        col1 = {this.state.col1}
        col2 = {this.state.col2}
        />
        </div>
        </div>
        </div>
        </div>
        )      
    }
    else return <Loading />
  }
};
export default Result;