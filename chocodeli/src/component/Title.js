import React, { PureComponent } from 'react';
import SetAlgorthm from "./SetAlgorthm";
import {ButtonToolbar,Button} from 'react-bootstrap';
class Title extends PureComponent {
    constructor(props) {
        super(props);
        this.state ={
            seShow: false
        }
        }

    
    render(){
        let modalClose = () => this.setState({ seShow: false });
        let modalOpen = () => this.setState({seShow:true});
        return (
            <div className='row'>
            <div className="col-lg-6 pad20">
            <p className="titleContent">{this.props.title} </p>
            </div>

            <div className="col-lg-6 pad20">
            <ButtonToolbar>
            <Button variant="primary" className="GetStart"
            onClick= {modalOpen}
            >Get Start</Button>
            <SetAlgorthm show={this.state.seShow} 
            onHide={modalClose}
            />
            </ButtonToolbar>

            </div>
            </div>
            )
       }
};
export default Title;