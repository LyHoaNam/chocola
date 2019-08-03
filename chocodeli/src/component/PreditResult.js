import React, {PureComponent} from "react";
import "../style/main.css";
import Menulist from "./Menulist";
import Loading from "./Loading";
import KnnPredit from "./predit/KnnPredit";
import NmfPredit from "./predit/NmfPredit";
import SlopOnePredit from "./predit/SlopOnePredit";

class PreditResult extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: null, 
      listAl: null,
      user: null,
      rating: null,
      item: null,
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

    if(nameAlgorthm === 'knn'||
      nameAlgorthm === 'nmf' ||
      nameAlgorthm === 'slopeone') {
        this.setState ({
          user: tempdata.user,
          listAl:tempdata.ChooseAl,
          item: tempdata.item,
          rating: tempdata.rating
        })
    }
  }
  writeContent(){
    //write result of algorthm
    let nameAlgorthm = this.props.match.params.id;
    switch(nameAlgorthm){
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
      default:
       return 'err some thing';
    }

  }

  render() {
    if(this.state.listAl){
      let listAlgorthm=this.state.listAl;

      let showcontent = this.writeContent();
      return (
        <div className="containtPredit" id="containtPredit">
        <div className="row marginright0">
        <div className='col-lg-2'>
        <div className='Listmenu'>
        {
          listAlgorthm.map((Name,index)=>  
              <Menulist key={index} 
                  algorthm={Name} 
                  linkto={'/predit/'+Name}
              />
            )   
        }  
        <div className="containColSel">
          <div className="Infomation">
          <div className="DetailInfo">
          the columns you selected
          </div>
          <div className="colSelected">
          column for user:
          <span className="nameCol">
          {this.state.user}
          </span>
          </div>
          <div className="colSelected">
          column for item:
          <span className="nameCol">
          {this.state.item}
          </span>
          </div>
          <div className="colSelected">
          column for rating:
          <span className="nameCol">
          {this.state.rating}
          </span>
          </div>
          </div>
        </div>   
        
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
export default PreditResult;