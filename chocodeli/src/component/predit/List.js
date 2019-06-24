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
    this.handleChange=this.handleChange.bind(this);
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
    if(toSearch !== ""){
        
      searchData = masterData.filter(function(item){
      return item == toSearch;
      });
    }   
    else {
      searchData = this.props.data.length > 10 ?
      this.props.data.slice(0,10) : this.props.data;
    }
    this.setState({inputValue:toSearch,table:searchData,
     hasMoreItem:false});
    

  }
  choseValue(event){
  let value=event.target.innerHTML;
  this.setState({chosevalue:value});
      // call back value from parent
      this.props.callbackValue(value);
    }
    handleChange(event){
      let value = event.target.value;
      this.setState({chosevalue:value});
      // call back value from parent
      this.props.callbackValue(value);
    }
    writeFunc(dataTable){
      let result=[];
      if(dataTable.length>0)
        {dataTable.map((record,index)=>
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
      let items=this.writeFunc(this.state.table);
      return (
       <div className="ListPredit">
       <div className="">
       <div className="DetailContent">
       <div className="ContainChose">      
       <span className="rightTitle">
        <input type="number"
       placeholder="choose value"
       className="formChoseValue"
       value={this.state.chosevalue}
       onChange={this.handleChange}
       />
       </span>
       </div>
       <span className="SerachButton">
       <input type="text" className="formControl"  
       placeholder="Search" 
       value={this.state.textChange} 
       onChange={this.filterFunc}
       />
       <span className="searchIcon">
       <img src={require('../../img/search.png')}
       alt=""
       className=""/>
       </span>
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