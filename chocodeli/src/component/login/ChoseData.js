import React, {PureComponent} from 'react';
import '../style/start.css';
class ChoseData extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      upload: "fail"
    };
    this.SelectData=this.SelectData.bind(this);
  }

  SelectData(e){
    const root = 'http://127.0.0.1:5000/';
    let uri = root + 'api';
    let formdata = new FormData();
    formdata.append("key", e.target.files[0]);

    let options = {
      method: 'POST',
      mode: 'no-cors',
      body: formdata
    }
    let req = new Request(uri, options);

    fetch(req)
    .then((response)=>{
      if(response.ok){
        return response.text();
      }else{
      this.props.SendSuccess("work");
      }
    })
    .then( (j) =>{
      console.log("j",j);
    })
    .catch( (err) =>{
      console.error( err.toString());
    });
 /*  
   fetch('http://127.0.0.1:5000/api?data='+url)
 .then((res) => res.json())
 .then(ruleData=> this.setState({rule: ruleData}))
 .catch(e=> e)
 */
}
render() {

  return (
      <div className="App">
          <div className="ContainLogo">
            <img src={require('../img/color-logo.png')} className="App-logo" alt="logo" />
          </div>
        <div className="App-header col-lg-6 col-sm-6 col-xl-6">

          <p className="welcome">
            Recommender System Tool For Everyone
          </p>
          <div className="toChocola">
          Welcome to Chocola, this tool can help you make everything great than. Click a button below, choose a best data and get a good result
          </div>
          <div className="ButtonChoosefile">
          <input id="choseFile" 
          name='fileName' 
          type="file"
          onChange= {this.SelectData} />
          </div>
        </div>
      </div>
    );
  }
}

export default ChoseData;