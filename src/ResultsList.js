import React, { Component } from 'react';

class ResultsList extends Component{

  render(){
    let resultsArray = this.props.results;
    let resultsDisplay = resultsArray.map((result, index) => {
      return <li
        style={{color:'blue', textDecoration: 'underline'}}
        onClick={()=>this.props.findInventory(result.prodId)}
        key={index}>{ result.name }
      </li>
    });



    if(this.props.loading){
      return (<h3>LOADING DATA</h3>)
    }
    else{
      return (
        <ul>
          { resultsDisplay }
        </ul>
      )
    }
  }

}


export default ResultsList;
