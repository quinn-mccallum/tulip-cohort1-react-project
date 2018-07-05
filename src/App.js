import React, { Component } from "react";
import { fetchLcboEndpoint } from "./api/lcbo.js";
import SearchBar from "./SearchBar.js";
import ResultsList from './ResultsList.js';
import Map from './Map.js';



class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      results: [],
      loading: true,
      selectedStores: [],
    }
  }

  findProducts = (e, query) => {
    if(e){
        e.preventDefault();
    }
    fetchLcboEndpoint("products", {
      q: query
    }).then(data => {
      console.log(data);
      const productList = data.result.map(prod=>{
        return {
          name: prod.name,
          prodId: prod.id
        }
      });
      this.setState({
        results: productList,
        loading: false
      })
      console.log('here is our list of pruned products: ', productList);
    }).catch(err => {
      console.log(err);
    })
  }

  findInventory = id => {
    fetchLcboEndpoint("stores", {
      product_id: id
    }).then(data => {
      const modifiedProducts = this.state.results.map(product => {
        if(parseInt(product.prodId) === parseInt(id)){
          return {...product, stores: data.result};
        } else {
          return product;
        }
      })
      this.setState({results: modifiedProducts, selectedStores: data.result})
      console.log(data);
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    // example of making an API request to the LCBO API
    this.findProducts(null, 'radler')
  }

  render() {
    return (
      <div>
        <p>
          Hello World!
        </p>
        <SearchBar findProducts={this.findProducts} />
        <ResultsList findInventory={this.findInventory} results={this.state.results} loading={this.state.loading} />
        <Map stores={this.state.selectedStores}/>
      </div>
    );
  }
}

export default App;
