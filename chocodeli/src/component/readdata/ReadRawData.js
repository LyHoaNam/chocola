import React, {PureComponent} from "react";
import Loading from "../Loading";
import Infomation from "./Infomation";
import '../../style/chill.css';
import Title from "./Title";
import Tables from "./Tables";
class ReadRawData extends PureComponent {
	constructor(props) {
		super(props);

		this.state ={
			result: [],
			seShow: false,
		}
		
	}
	componentDidMount () {
		if(localStorage.getItem('rawdata')){
			this.setDataToState();	
		}
		else{
			this.getData();
		}
	}
	setDataToState(){
		let tempdata= localStorage.getItem('rawdata');
			tempdata=JSON.parse(tempdata);
			this.setState({result:tempdata.data});
	}
	getData() {
		//get name data in sessionStorage
		if(sessionStorage.getItem('name_data')) {
			let nameData = sessionStorage.getItem('name_data');
			//ready to fetch data
			let root = "http://localhost:5000/";
			let url= root + 'rawdata?filename='+nameData;
			fetch(url)
			.then(res=>res.json())
			.then(result=>
			{
				localStorage.setItem("rawdata",
					JSON.stringify(result));
				this.setDataToState();
			}
			)
			.catch(e=>e);   
			console.log("err");}

	}

	render(){ 
			
		if(this.state.result.length>0){
		return (   
			<div className='containRRD'>
			<div id="content">
			
			<Title/>
			<div className="row">
			<Infomation Content1={"Size file: "}
			Content2={"Column: "}
			Content3={"Row: "}/>

			<Tables data={this.state.result}/>
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