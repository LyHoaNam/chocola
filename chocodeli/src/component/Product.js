import React, {PureComponent} from "react";
import "../style/main.css";
import filterProduct from "./FilterProduct";
import { Button } from 'react-bootstrap';
import DetailRule from "./DetailRule";
class Product extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      deShow: false,
      itemkey: null
    };
  }
  smClose = () => 
  {this.setState({ deShow: false })};
  render() {
    let product = filterProduct(this.props.textChange,200);
    
  
    return (

      <div id="content">
      <div className="row">
      <div className="col-lg-12">
    
      <table className="table padleft">
      <thead >
      <tr>
      <th scope="col" className="padleft50">Product Name</th>
      </tr>
      </thead>

      <tbody>
      {
        product.map((item,index)=>
          <tr key= {"tr"+index}>
          <td>
          {item}
          <Button
          className="IconRe"
          bsStyle="primary"
          bsSize="small"
          onClick={() => this.setState({ deShow: true,itemkey:item })}
        >
         <i className="fas fa-american-sign-language-interpreting"></i>
        </Button>
          </td>
          </tr>
          )}
          </tbody>

          </table>
          <DetailRule show={this.state.deShow} onHide={this.smClose}
            ikey={this.state.itemkey}
            rule= {this.props.rule}/>
          </div>
          </div>
          </div>

          );

        }
      }

      export default Product;