import React, {PureComponent} from "react";
import {Table} from "react-bootstrap";
import Loading from "./Loading";
import Infomation from "./Infomation";
class ReadRawData extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
			result: ''
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

		if(this.state.result)
		{
			return (   
				<div id="content">

				<div className="row">
				<div className="col-lg-12 pad10">
				<div className="col-lg-6">
				<p className="titleContent">Algorthm: </p>
				</div>
				</div>
				</div>

				<Infomation/>

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
				<tbody>
				{
					this.state.result.map((record,index)=>
						<tr key ={index}>
						{record.map((item,i)=>
							<td key={i}>{item}</td>
							)
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