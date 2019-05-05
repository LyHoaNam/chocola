import React, {PureComponent} from "react";
import "./predit.css";

class Rating extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			selectuser:this.props.selectUser,
			selectitem:this.props.selectItem,
			coluser:this.props.colUser,
			colitem:this.props.colItem,
			colrating:this.props.colRating,
			rating:false
		}
		this.getData=this.getData.bind(this);
	}

	 getData() {
	 	if(sessionStorage.getItem('name_data')) {
	      let nameData = sessionStorage.getItem('name_data');
		 let url = `http://localhost:5000/api/knnbasic?`+
		 `filename=${nameData}&`+
		 `user=${this.state.coluser}&item=${this.state.colitem}&`+
		 `rati=${this.state.colrating}&idd=${this.props.selectUser}&iid=${this.props.selectItem}`;
		 let selectUser= this.props.selectUser;
		 console.log('url: ',url);
		 if(selectUser !== '' && selectUser !== '')
		 {
		 	
		 	fetch(url)
	    .then(res=>res.json())
	    .then(result=>
	    {
	      this.setState({rating:result.KNNBasic});
	      console.log('result fetch: ',result);
	    }
	    )
	    .catch(e=>e);   
	    console.log("err in fetch at Rating (Predit)");
	}
	 }
    /*
    */
  }
	render(){
		return(
			<div className="col-lg-6">
			<span className ="btnPredit"
			onClick={this.getData}>
			Predit
			</span>
			<span className="resultPredit">
			{this.state.rating ? 
				this.state.rating.predit: ''}
			</span>
			</div>
			)
	}
}
export default Rating;