import React, {PureComponent} from "react";
import "../../style/main.css";
import "./predit.css";
import {Table} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroller';
class List extends PureComponent {
	constructor(props){
		super(props);
    this.state ={
      inputValue: '',
      ruler:10,
      hasMoreItem:true,
      table: this.props.data.slice(0,10),
      original: this.props.data,
      chosevalue:''
    }
    this.loadFunc = this.loadFunc.bind(this);
    this.filterFunc=this.filterFunc.bind(this);
    this.choseValue=this.choseValue.bind(this);
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
  filterFunc(e){
    //search value of input search
    let masterData = this.props.data;
    let toSearch= e.target.value;
    let searchData = [];
    if(toSearch !=="")
      {masterData.filter(item =>
        { 
          if(item.includes(toSearch)===true)
          searchData.push(item);
        })
      }   
      else {
        searchData=masterData;
      }
      this.setState({inputValue:toSearch,original:searchData,
       hasMoreItem:false});
    }
    choseValue(event){
      let value=event.target.innerHTML;
      this.setState({chosevalue:value});
      // call back value from parent
      this.props.callbackValue(value);
    }
  writeFunc(){
    let result=[];
    if(this.state.table.length>0)
      {this.state.table.map((record,index)=>
        {     
          result.push(  
          <tr key={index} className="ChoseItem">
          <td key={'i'+index}> {index+1} </td>
          <td key = {'d'+index}
          onClick={this.choseValue}
          >
          {record}
          </td>
          </tr>
          )
    })}
    return result;
  }
  render(){
    let items=this.writeFunc();
    return (
     <div className="ListPredit">
     <div className="Infomation martop10">
     <div className="DetailContent">
     <div className="ContainChose">
     <span className="LeftTitle">
     Chose Value
     </span>
     <span className="rightTitle">
     { this.state.chosevalue }
     </span>
     </div>
     <span className="SerachButton">
     <input type="text" className="form-control"  placeholder="Search" 
     value={this.state.textChange} onChange={this.handleChange} />
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
     <th>{this.props.colName}</th>
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

export default List;