import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { term: '' };
  }

  render(){
    return(
      <div style={{
            // border: 'solid thin red',
            display: 'flex',
            justifyContent: 'center'}}>
        <form
          style={{width: '75%'}}
          onSubmit={e=>this.props.findProducts(e, this.state.term)}
        >
          {/* <label>Search for LCBO products: </label> */}

              <input
                style={{width: '80%', height: '2rem', boxSizing: 'border-box'}}
                placeholder='Search for LCBO products'
                value={ this.state.term }
                onChange={ (e) => this.setState({ term: e.target.value }) }
              />

              <input
                type='submit'
                value='submit'
                style={{height: '1.9rem', width: '20%', boxSizing: 'border-box'}}
              />

        </form>
      </div>
    )
  }
}


export default SearchBar;
