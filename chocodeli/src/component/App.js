import React, { PureComponent } from 'react';
import Header from "./Header";
import Purpleheader from './Purpleheader';
import	Menu from './Menu';
import Result from './Result';
import Product from './Product';
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rule: null,
      algorithm: 'fpgrowth',
      min_conf: 0,
      min_sup:0,
      searchText: "",
      showContent: ""
    };
    this.textChangefuc = this.textChangefuc.bind(this);
  }

componentDidMount () {
    this.getData();
  }
  getData() {
     fetch(`http://127.0.0.1:5000/api/${this.state.algorithm}`)
      .then(response => response.json())
      .then(ruleData => this.setState({rule:ruleData.rules,
        min_sup:ruleData.min_sup,
        min_conf:ruleData.min_conf
      }))
      .catch(e => e)
  }
      textChangefuc(){
      return this.state.searchText;
      
    }
  //this fuction get data from child
  myCallback = (dataFromChild) => {

        this.setState({algorithm:dataFromChild,
          showContent:dataFromChild},this.getData)
    }
    productCallback = (product) =>{
      this.setState({showContent:product})
    }
    handleSearchChange = (event) => {

        this.setState ({
        searchText: event.target.value
      },this.textChangefuc)
    }

  render() {

    if(this.state.rule){
     return (
      <div>
      <Header  textChange={this.handleSearchChange}/>

      <div className="wrapper">
        

        <Menu callbackFromParent={this.myCallback} />
        {
          this.state.showContent ==='product' ?
            <Product textChange={this.textChangefuc()}
            rule= {this.state.rule}/>:
            <Result rule= {this.state.rule}
            textChange={this.textChangefuc()}/>
          
        }
        
      </div>
      </div>
    );
    }
   return <p>err somthing</p>;
  }

}

export default App;
