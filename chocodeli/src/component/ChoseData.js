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

    <div>
    <div className="App">
    <div className="App-header">
    <img src={require('../img/logo.png')} className="App-logo" alt="logo" />
    <strong className="welcome">
    WELCOME TO CHOCOLA
    </strong>
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