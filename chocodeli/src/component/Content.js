import React, {PureComponent} from "react";
import "../style/main.css";
import PropTypes from "prop-types";
import AssoRule from "./AssoRule";
import {Table} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroller';
class Content extends PureComponent {
	constructor(props){
		super(props);
    this.state ={
      inputValue: '',
      ruler:30,
      hasMoreItem:true,
      table: this.props.data.slice(0,30),
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
    if(startpoint+30>limit)
    {
      endpoint=limit;
      this.setState({hasMoreItem:false});
    }
    else
      endpoint=startpoint+30;
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
  writeFunc(){
    let result=[];
    if(this.state.table.length>0)
      {this.state.table.map((record,index)=>
        {     
          result.push(  
          <tr key={index}>
          <td key={'i'+index}> {index+1} </td>
          <td>
          {record.fist.map((item,i) => (
            <div key={i}>{item}</div>
            ))}
          </td>
          <td key={"tdn"+index}>
          {record.next.map((item,i) => (
            <div key={i}>{item}</div>
            ))}
          </td>
          </tr>
          )
    })}
    return result;
  }
  render(){
    let items=this.writeFunc();
    return (
     <div className="col-lg-12">
     <div className="Infomation martop10">
     <div className="DetailContent">
     <span className="DetailInfo">
     Result
     </span>
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
     <th>Buy Product</th>
     <th scope="col">Recomend Product</th>
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