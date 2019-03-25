import React, {PureComponent} from "react";
import Loading from "./Loading";
import Infomation from "./Infomation";
import '../style/chill.css';
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
		fetch('http://localhost:5000/rawdata')
		.then(res=>res.json())
		.then(result=>
		{
			localStorage.setItem("rawdata",JSON.stringify(result));
			this.setDataToState();
		}
		)
		.catch(e=>e);   
		console.log("err");

	}

	render(){ 
		
		if(this.state.result.length>0){
		return (   

			<div id="content">

			<Title title={"Your data"}/>

			<Infomation Algorthm={"Size file: "}
			minCof={"Column: "}
			minSup={"Row: "}/>

			<Tables data={this.state.result}/>
			</div>
			)
		}
		else
			return <Loading />

	}
}
export default ReadRawData;