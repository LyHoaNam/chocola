import React, {PureComponent} from "react";
import "../style/main.css";
import { Button,Modal } from 'react-bootstrap';
import FilterRule from "./FilterRule";
class DetailRule extends PureComponent {

  render(){
  	let propskey =this.props.ikey;
  	return (
  		<span className="modal-container " style={{ height: 200 }}>
        <Modal
          {...this.props}
          bsSize="small"
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header >
            <Modal.Title id="contained-modal-title">
              Contained Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FilterRule Filkey={propskey} 
            rule= {this.props.rule}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </span>)
  }
}
export default DetailRule;