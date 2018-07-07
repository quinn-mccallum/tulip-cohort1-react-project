import React, { Component } from "react";
import { fetchLcboEndpoint } from "./api/lcbo.js";
import SearchBar from "./SearchBar.js";
import ResultsList from './ResultsList.js';
import Map from './Map.js';
import './App.css';




class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      results: [],
      loading: false,
      selectedStores: [],
      error: null,
      selectedProduct: null
    }
  }

  findProducts = (e, query) => {
    e.preventDefault();
    this.setState({loading: true})
    fetchLcboEndpoint("products", {
      q: query
    }).then(data => {
      const productList = data.result.map(prod=>{
        return {
          name: prod.name,
          prodId: prod.id
        }
      });
      this.setState({
        results: productList,
        loading: false,
        selectedStores: [],
        selectedProduct: null
      });
    }).catch(err => {
      this.setState({error: err});
    })
  }

  findInventory = id => {
    this.setState({loading: true, selectedProduct: null});
    fetchLcboEndpoint("stores", {
      product_id: id, per_page: 100
    }).then(data => {
      const modifiedProducts = this.state.results.map(product => {
        if(product.prodId === id){
          return {...product, stores: data.result};
        } else {
          return product;
        }
      });
      const selectedProduct = this.state.results.filter(product => product.prodId === id)[0];
      this.setState({results: modifiedProducts, selectedStores: data.result, loading: false, selectedProduct});
    }).catch(err => {
      this.setState({error: err});
    })
  }

  // componentDidMount() {
  //   // example of making an API request to the LCBO API
  //   this.findProducts(null, '')
  // }

  render() {
    return (
      <div className='contentArea' style={{width: '90%', height: '100%', border: 'solid thin black', margin: '5% auto'}}>
        <h1 style={{textAlign: 'center'}}>
          LCBO Product Search & Locate
        </h1>
        { this.state.error && 'We have run into an error, please try again later.' }
        <SearchBar findProducts={this.findProducts} style={{margin: '0 auto'}}/>
        <ResultsList
          findInventory={this.findInventory}
          results={this.state.results}
          loading={this.state.loading}
        />
        <Map
          loading={this.state.loading}
          stores={this.state.selectedStores}
          selectedProduct={this.state.selectedProduct}
        />
      </div>
    );
  }
}

export default App;
