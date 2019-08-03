import React, {PureComponent} from "react";
import "../../style/main.css";
import {Table} from "react-bootstrap";
import ExportToCSV  from "../ExportToCSV";
import InfiniteScroll from 'react-infinite-scroller';
class Content extends PureComponent {
	constructor(props){
		super(props);
    this.state ={
      inputValue: '',
      ruler:0,
      hasMoreItem:true,
      table: this.props.data.slice(0,10),
      original: this.props.data
    } 
    this.loadFunc = this.loadFunc.bind(this);
    this.filterFunc=this.filterFunc.bind(this);
  }
  loadFunc(){
  //get a next of check point
    if(this.state.hasMoreItem){
     let limit = this.props.data.length;
     let startpoint = this.state.ruler;
     let endpoint=0;
     if(startpoint+10>limit)
     {
      endpoint=limit;
      this.setState({hasMoreItem:false});
      }
    else
      endpoint=startpoint+10;
    let tables = this.state.original.slice(0,endpoint);
      this.setState({table:tables,
      ruler:endpoint});
    }

  }
  checkArrayHaveValue(arr,searchText){
    for(let i=0; i<arr.length; i++){
      if(arr[i].toString().toLowerCase().indexOf(searchText) !== -1)
        return true;
    }
    return false;
  }
  filterFunc(e){
    //search value of input search
    let masterData = this.props.data;
    let toSearch= e.target.value;
    toSearch = toSearch.toString().toLowerCase();
    let searchData = [];
    if(toSearch !==""){    
      searchData = masterData.filter(item =>
      { 
        return (this.checkArrayHaveValue(item.left,toSearch)||
            this.checkArrayHaveValue(item.right,toSearch) ||
            item.conf.toString().indexOf(toSearch) !== -1)
      })
      this.setState({inputValue:toSearch,table:searchData,
      hasMoreItem:false});
    }   
    else {
      searchData=masterData.slice(0,10);
      this.setState({inputValue:toSearch,table:searchData,
      hasMoreItem:true});
    }
    
  }
  writeFunc(){
    let result=[];
     this.state.table.map((record,index)=>{     
      result.push(  
        <tr key={index}>
        <td key={'i'+index}> {index+1} </td>
        <td key={"tdf"+index}>{
          record.left.map((item,i) => (
          <div key={i}>{item}</div>
          ))
        }
        </td>
        <td key={"tdn"+index}>
        {
          record.right.map((item,i) => (
          <div key={i}>{item}</div>
          ))
        }
        </td>
        <td>
        {
          record.conf
        }
        </td>
        </tr>
      )
    })
    return result;
  }
  render(){
    let items = [];
    items = this.writeFunc();
    return (
     <div className="col-lg-8">
     <div className="Infomation">
     <div className="DetailContent">
     <span className="DetailInfo">
     Result
     </span>
     <ExportToCSV data={this.props.data}/>
     <span className="SerachButton">
     <input type="text" className="form-control"  placeholder="Search" 
     value={this.state.textChange} onChange={this.filterFunc} />
     </span>
     </div>
     <div className="OverFlow">
    <InfiniteScroll
     pageStart={0}
     loadMore={()=>this.loadFunc()}
     hasMore={this.state.hasMoreItem}
     loader={<div className="loader" key={0}>Loading ...</div>}
     useWindow={false}
     >
     <Table responsive>
     <thead>
     <tr>
     <th>No</th>
     <th>Selected items</th>
     <th scope="col">Recomend item</th>
     <th>Confidence</th>
     </tr>
     </thead>
     <tbody>
     {items}
     </tbody>
     
     </Table>
     </InfiniteScroll>
     </div>
     </div>
     </div>

     )
    }
};

export default Content;