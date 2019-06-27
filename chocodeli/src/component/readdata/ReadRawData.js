import React, {PureComponent,lazy} from "react";
import Infomation from "./Infomation";
import '../../style/chill.css';
import PieChart from "./PieChart";
import Unique from "./Unique";
import Describe from "./Describe";
const Title = lazy(()=> import('./Title'));
const Tables = lazy(()=> import('./Tables'));
class ReadRawData extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
			result: [],
			authorization:"",
			seShow: false,
			page:0,
			filename:'',
			shape:[],
			type:null,
			unique: null,
			header: null
		}
	}
	componentDidMount () {
		if(localStorage.getItem('Auth')){
			let author=localStorage.getItem('Auth');
			this.setState({authorization:author});
			this.getInfoData(author);	
		}
	}
	
	getInfoData(bearer){
		let url= '/data/info';
		let options = {
			method: 'GET',
			headers: {
				'Authorization': bearer
			}
		}

		fetch(url,options)
		.then(res=>res.json())
		.then(res=>
		{
			if(res.filename){
				this.setState({
					filename:res.filename,
					shape:res.shape,
					unique:res.unique,
					type:res.type,
					header: res.header
				})
				sessionStorage.setItem("row",res.shape[0]);
			}
		}
		)
		.catch(e=>{
			//window.location.href="/login";
		});   

	}

	render(){ 
		return (   
			<div className='containRRD'>
			<div id="content">
			{
				this.state.header !== null ?
				<Title
				Column={this.state.header}
				Type={this.state.type}
				/>: ""
			}
				<div className="row">
				<div className="col-lg-8">
				<div className="row">
				<div className="col-lg-4">
				<Infomation Content1={this.state.filename}
				Shape = {this.state.shape}
				/>
			{
				this.state.type !== null ?
				<PieChart 
				Data = {this.state.type}
				/>: ""
			}
				</div>
			{
				this.state.unique !== null ?
				<Unique
				Data = {this.state.unique}/>: ""
			}
			<Tables />
			</div>
			</div>

			<Describe/>

			</div>
			</div>
			</div>
		)
	}
}
export default ReadRawData;