import React, {PureComponent} from "react"
import "../style/main.css"

class Filteremloyee extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rule:[],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/api/fuckmorther")
    .then(results => {
      return results.json();
    }).then(data => {
      let index_key ="index"+0;
      let rules = data.rule.map((item) => {
        index_key +=1;
        return (
          <tr key={index_key}>
          <td>{item.Next}</td>
          <td>{item.Rule}</td>
          <td>{item.Confidence}</td>
          <td>{item.Lift}</td>
          <td>{item.Support}</td>
          </tr>
          )
      })   
      this.setState({rule: rules})
    })

  }

  render() {

    return (
      <div id="content">
      <div className="row">
      <div className="col-lg-12">
      
      <table className="table padleft">
      <thead >
      <tr>
        <th scope="col" className="padleft50">Product</th>
        <th scope="col">Recomend Product</th>
        <th scope="col">Confidence</th>
        <th scope="col">Lift</th>
        <th scope="col">Support</th>  
      </tr>
      </thead>

      <tbody>
        {this.state.rule}
      </tbody>

      </table>
      </div>
      </div>
      </div>

      );
  }
}
export default Filteremloyee;