import React, { PureComponent } from 'react';
import './login.css';

class Profile extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			idUser:"",
			listData:'',
			writeList:"",
			user:""
		}
		this.SelectData=this.SelectData.bind(this);
	}
	componentDidMount(){
		if(localStorage.getItem('account')){
			let tempdata=localStorage.getItem('account');
			tempdata=JSON.parse(tempdata);
			this.setState({idUser:tempdata.id,user:tempdata.user});
			this.getData(tempdata.id);
		}
	}
	getData(iduser){
		let root = "http://localhost:5000/";
		let url= root + 'api/getdata'
		let formdata = new FormData();
		formdata.append('iduser', iduser);
		let options = {
			method: 'POST',
			body: formdata
		}
		let req = new Request(url,options);
		fetch(req)
		.then(res => res.json())
		.then(response => {
			let result = response;
			if(result!=='false'){
				this.setState({listData:result});
			}
		})
		.catch(error => console.error('Error:', error));
	}
	 SelectData(e){
    const root = 'http://127.0.0.1:5000/';
    let uri = root + 'api';
    let formdata = new FormData();
    formdata.append("key", e.target.files[0]);
	formdata.append("iduser", this.state.idUser);
    let options = {
      method: 'POST',
      mode: 'no-cors',
      body: formdata
    }
    let req = new Request(uri, options);

    fetch(req)
    .then((response)=>{
    	console.log('response');
    })
    .then( (j) =>{
      console.log("j",j);
    })
    .catch( (err) =>{
      console.error( err.toString());
    });
    window.location.href="/";
	}
	saveNameData(name){
		sessionStorage.setItem('name_data',name);
		return "fas fa-angle-double-right icCheced";
	}
	writeDataFile(listData){
		let resultDiv=[];
		if(listData.listdata)
		{	
			listData.listdata.map((record,index)=>{

			let checkedBox = record.selected ? 
					this.saveNameData(record.name_data):""
				
				resultDiv.push(
					<div className="detailData" key={'detailData'+index}>
					<i className={checkedBox} />
					<span className="titleData" key={'titleData'+index}>
					Data name: 
					</span>
					<span className="nameData" key={'nameData'+index}>
					{record.name_data}
					</span>
					</div>
					)})
		}	
		return resultDiv;

	}
	
	render(){
		if(this.state.listData !=='') {
			let writelist = this.writeDataFile(this.state.listData)
			return(
				<div className='containRRD'>
				<div id="content">
				<div className="row">
				<div className="col-lg-8">
				<div className="ContainProfile">
				<span className="Avatar">
				<img src={require('../../img/avatarraw.jpeg')} className="avatarraw" alt="logo" /></span>
				<span className="ProfileUser">{this.state.user}</span>
				</div>
				</div>
				<div className="col-lg-4 pad100">
				<div className="ContaintData">
				<input id="choseFile" 
          		name='fileName' 
         		 type="file"
         		 onChange= {this.SelectData} />
				<div className="listData">
				<div className="titlelistData">List data</div>
				{
					writelist
			}
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				)
		}
		return "loading...";
		
	}
}
export default Profile;