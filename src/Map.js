import React, { Component } from 'react';
import { GoogleMap, withGoogleMap, Marker } from 'react-google-maps';

class Map extends Component{
  // static defaultProps = {
  //   center: { lat: 43.6565353, lng: -79.4609571},
  //   zoom: 8
  // }


  render(){

    const MyMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 43.6565353, lng: -79.4609571 } }
        defaultZoom = { 13 }
      >

        { this.props.stores.map(location => {
          return <Marker
                    position = { { lat: location.latitude, lng: location.longitude } }
                  />
        }) }


      </GoogleMap>
    ))

    return(
      <div>
        booze map
        <MyMap
          containerElement = { <div style={{height: '500px', width: '500px'}} /> }
          mapElement = { <div style={{height: '100%'}}/> }
        />
      </div>
    )
  }
}

export default Map;
