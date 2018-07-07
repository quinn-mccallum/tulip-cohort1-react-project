import React, { Component } from 'react';
import { GoogleMap, withGoogleMap, Marker } from 'react-google-maps';

class Map extends Component{

  render(){

    const MyMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 43.6565353, lng: -79.4609571 } }
        defaultZoom = { 11 }
      >

        { this.props.stores.map(location => {
          return <Marker
                    position = { { lat: location.latitude, lng: location.longitude } }
                    key = {`${location.latitude}${location.longitude}`}
                    label = {`${location.quantity}`}
                  />
        }) }


      </GoogleMap>
    ))

    return(
      <div>
        { this.props.loading && <div style={{textAlign: 'center'}}>Loading...</div> }
        { this.props.selectedProduct && <div style={{textAlign: 'center'}}>{`Displaying stores for ${this.props.selectedProduct.name}.`}</div> }
        <MyMap
          containerElement = { <div style={{height: '750px', width: '100%'}} /> }
          mapElement = { <div style={{height: '100%'}}/> }
        />
      </div>
    )
  }
}

export default Map;
