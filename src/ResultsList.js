import React, { Component } from 'react';

class ResultsList extends Component{

  render(){
    let resultsArray = this.props.results;
    let resultsDisplay = resultsArray.map((result, index) => {
      return <li
        style={{color:'blue',
                textDecoration: 'underline',
                cursor: 'pointer'}}
        onClick={()=>this.props.findInventory(result.prodId)}
        key={index}>{ result.name }
      </li>
    });



    if(this.props.results.length === 0){
      return (<h3 style={{textAlign: 'center'}}>Search for a product to display results</h3>)
    }
    else{
      return (
        <div style={{display: 'flex',
                    justifyContent: 'center'}}>
          <h3 style={{textAlign: 'center'}}>Products:</h3>
          <ul style={{listStyleType: 'none'}}>
            { ( !this.props.loading || this.props.results.length > 0 ) &&  resultsDisplay }
          </ul>
        </div>
      )
    }
  }

}


export default ResultsList;
