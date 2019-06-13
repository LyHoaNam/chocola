import React, {PureComponent,lazy} from "react";
import Loading from "../Loading";
import Infomation from "./Infomation";
import '../../style/chill.css';
import Tables from "./Tables";
import PieChart from "./PieChart";
import Unique from "./Unique";
import Describe from "./Describe";
const Title = lazy(()=> import('./Title'));
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
			unique: null
		}
	}
	componentDidMount () {
		if(localStorage.getItem('Auth')){
			let author=localStorage.getItem('Auth');
			this.setState({authorization:author});
			this.getData(author,this.state.page);
			this.getInfoData(author);	
		}
		else{
		}
	}
	getData(bearer,page) {
			//ready to fetch data
			let url= '/data/page/'+page;
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
				this.setState({result:res})
			}
			)
			.catch(e=>{
				//window.location.href="/login";
			});   

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
						type:res.type
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
			
			if(this.state.result.status === 'success'){
				return (   
					<div className='containRRD'>
					<div id="content">

					<Title
					Column={this.state.result.data[0]}
					Type={this.state.type}
					/>
					<div className="row">
					<div className="col-lg-8">
					<div className="row">
						<div className="col-lg-4">
						<Infomation Content1={this.state.filename}
						Shape = {this.state.shape}
						/>
						<PieChart 
						Data = {this.state.type}
						/>
						</div>
						<Unique
						Data = {this.state.unique}/>
						<Tables data={this.state.result}/>
					</div>
					</div>
					
					<Describe/>
					
					</div>
					</div>
					</div>
					)
				}
				else
					return <Loading />

			}
		}
		export default ReadRawData;