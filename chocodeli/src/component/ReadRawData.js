import React, {PureComponent} from "react";
import {Table,ButtonToolbar,Button} from "react-bootstrap";
import Loading from "./Loading";
import Infomation from "./Infomation";
import '../style/chill.css';
import SetAlgorthm from "./SetAlgorthm";
class ReadRawData extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
			result: '',
			seShow: false
		}
	}
	componentDidMount () {
		this.getData();
	}
	getData() {
		fetch('http://localhost:5000/rawdata')
		.then(res=>res.json())
		.then(result=>
		{
			this.setState({result: result.data})
		}
		)
		.catch(e=>e);   
		console.log("err");

	}
	render(){ 
		let modalClose = () => this.setState({ seShow: false });
		let modalOpen = () => this.setState({seShow:true});
		let arrData = this.state.result;
		if(this.state.result)
		{
			return (   
				<div id="content">

				<div className="row">

				<div className="col-lg-6 pad20">
				<p className="titleContent">Algorthm: </p>
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

				<Infomation Algorthm={"Algorthm: "}
				minCof={"min_conf: "}
				minSUp={"min_sup: "}/>

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
				<Table responsive>
				<tbody striped="true">
				{
					arrData.length <100 ?
					arrData.map((record,index)=>
						<tr key={index}>
						<td key={'i'+index}> {index+1} </td>
						{record.map((item,i)=>(
							<td key={i}>{item}</td>
							))
					}
					</tr>
					):
					arrData.slice(0,100).map((record,index)=>
						<tr key={index}>
						<td key={'i'+index}> {index+1} </td>
						{record.map((item,i)=>(
							<td key={i}>{item}</td>
							))
					}
					</tr>
					)
				}
				</tbody>
				</Table>
			
				</div>
				</div>
				</div>
				</div>
				)
		}
		else return <Loading />
	}
}
export default ReadRawData;