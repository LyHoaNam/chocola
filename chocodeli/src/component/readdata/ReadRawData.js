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
			authorization:"",
			seShow: false,
			page:0
		}
	}
	componentDidMount () {
		if(localStorage.getItem('Auth')){
			let author=localStorage.getItem('Auth');
			this.setState({authorization:author});
			this.getData(author,this.state.page);	
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

		render(){ 
			if(this.state.result.status === 'success'){
				return (   
					<div className='containRRD'>
					<div id="content">

					<Title
					Column={this.state.result.data[0]}
					/>
					<div className="row">
					<Infomation Content1={"Size file: "}
					Content2={"Column: "}
					Content3={"Row: "}
				 	/>

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