import React, { PureComponent } from 'react';
import SetAlgorthm from "./SetAlgorthm";
import {Link } from 'react-router-dom';
import {ButtonToolbar,Button} from 'react-bootstrap';
class Title extends PureComponent {
    constructor(props) {
        super(props);
        this.state ={
            seShow: false
        }
        }
    writeButton(){
        if(sessionStorage.getItem('datasend')) {
            let tempdata=sessionStorage.getItem('datasend');
            tempdata=JSON.parse(tempdata);
            let linkto= tempdata.ChooseAl[0];
            return <Button variant="primary" className="GetStart">
            <Link to={'/algorthm/'+linkto} className="whiretext">
            Your algorthm
            </Link>
            </Button>
        }
        return ''
    }
    
    render(){
        let modalClose = () => this.setState({ seShow: false });
        let modalOpen = () => this.setState({seShow:true});
        let btnAlgorthm = this.writeButton();
        return (
            <div className='row'>
            <div className="col-lg-6 pad20">
            <p className="titleContent"> </p>
            </div>

            <div className="col-lg-6 pad20 ">
            <ButtonToolbar className="floatright">
            <Button variant="primary" className="GetStart"
            onClick= {modalOpen}
            >Get Start</Button>
            <SetAlgorthm show={this.state.seShow} 
            onHide={modalClose}
            column={this.props.Column}
            type={this.props.Type}
            />
            {btnAlgorthm}
            </ButtonToolbar>

            </div>
            </div>
            )
       }
};
export default Title;