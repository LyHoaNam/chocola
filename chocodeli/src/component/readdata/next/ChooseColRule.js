import React, {PureComponent} from "react";
import {Table} from "react-bootstrap";
import {Button} from  "react-bootstrap";
import NextAssoRule from"./NextAssoRule";
class ChooseColRule extends PureComponent {
  constructor(props){
    super(props);
    this.state ={
      inputValue: '',
      table:this.props.column,
      chosevalue:[],
      indexValue:[],
      showNext:false,
      display: 'displayBlock'
    }
    this.choseValue=this.choseValue.bind(this);
    this.removeValue=this.removeValue.bind(this);
    this.chooseAll=this.chooseAll.bind(this);
    this.clearAll=this.clearAll.bind(this);
    this.ReadyToNext=this.ReadyToNext.bind(this);
    this.CloseNextAssoRule=this.CloseNextAssoRule.bind(this);
  }
  ReadyToNext(){
    if(this.state.indexValue.length >1){
      this.setState({showNext:true,display:'displayNone'});
    }
  }
  checkValue(value){
    let arr = this.state.chosevalue;
    if(arr.includes(value)){
      return false;
    }
    return true;
  }
  chooseAll(){

    let arr = [];
    this.props.column.map((records,index)=>{
      arr.push(index)
    })
    this.setState({chosevalue:this.props.column,
      indexValue:arr});
  }
  clearAll(){
    this.setState({chosevalue:[],indexValue:[]});
  }
  choseValue(event){
    let value=event.target.innerHTML;
    let index = this.props.column.indexOf(value);
    if(this.checkValue(value)) {
      this.setState(prevState => ({
        chosevalue: [...prevState.chosevalue, value],
        indexValue: [...prevState.indexValue, index]
      }));
    }
    
  }
  removeValue(event){
    let value=event.target.innerHTML;
    let array = [...this.state.chosevalue]; // make a separate copy of the array
    let index = array.indexOf(value)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({chosevalue: array});
    }
  }

  writeFunc(){
    let result=[];
    if(this.state.table.length>0)
      {this.state.table.map((record,index)=>
        {     
          result.push(  
            <tr key={index}>
            <td key = {'d'+index}
            onClick={this.choseValue}
            className="cellCol"
            >
            {record}
            </td>
            </tr>
            )
        })}
    return result;
  }
  CloseNextAssoRule(){
    this.setState({display:'displayBlock',showNext:false})
  }
  render(){
    let writeColHave = this.writeFunc();
    return (
      <div>
      <div className={"NextModal "+this.state.display}>

      <div className="FontTitle">
      Algorthm: 
      {
        this.props.listdata !== null ?
        this.props.listdata.map((algo,index)=>
        {
      //write "," one each algo (alorthm)
      return index ===0 ?
      <span className="fontsmalltitle" key={index}>{" "+algo}</span>:
      <span className="fontsmalltitle" key={index}>{", "+algo}</span>
    }
    ): ""
      }
      </div>
      <div className="FontTitle">
      Choose column for run algorithm
      </div>
      <div className="alert alert-warning" role="alert">
      You should not add the id column!
      </div>
      <div className="row">
      <div className="col-lg-6">
      <div className="chooseColTable">
      <Table responsive hover size="sm">
      <tbody>
      {
       writeColHave
     }
     </tbody>

     </Table>
     </div>
     <div className="btnChooseRuleTable cellCol"
     onClick={this.chooseAll}>
     Choose all
     </div>
     </div>
     <div className="col-lg-6">
     <div className="chooseColTable">
     <Table responsive hover size="sm">
     <tbody>
     {
      this.state.chosevalue.map((record,index)=>
        <tr key={index}>
        <td key = {'d'+index}
        className="cellCol"
        onClick={this.removeValue}
        >
        {record}
        </td>
        </tr>)
    }
    </tbody>
    </Table>
    </div>
    <div className="btnChooseRuleTable cellCol"
    onClick={this.clearAll}>
    Clear all
    </div>
    </div>
    </div>
    <div className="ModalFooter padding15">
      <div className="ContainBtnBox">
      <span className="paddingRight15">
      <Button onClick={this.props.onNeHide}
      className="Close">Back</Button>
      </span>
      <Button className="Next"
      onClick={this.ReadyToNext}>Next
      </Button>
      </div>
      </div>
    </div>
    {
      this.state.showNext ?
      <NextAssoRule 
      listdata={this.props.listdata}
      onNeAsHide={this.CloseNextAssoRule}
      column={this.state.indexValue}/>:""
    }
    </div>
    )
  }
};

export default ChooseColRule;