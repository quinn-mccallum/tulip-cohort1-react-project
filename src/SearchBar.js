import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { term: ''};
  }

  render(){
    return(
      <div>
        <form onSubmit={e=>this.props.findProducts(e, this.state.term)}>
          <input
            value={ this.state.term }
            onChange={ (e) => this.setState({ term: e.target.value }) }/>
          <button type='submit' />
        </form>
          input: { this.state.term }
      </div>
    )
  }
}


export default SearchBar;
