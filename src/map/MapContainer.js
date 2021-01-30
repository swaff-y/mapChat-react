import React, {useEffect, useState} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = (props) => {

  const [lat,setLat] = useState(-33.8688197);
  const [long,setLong] = useState(151.2092955);
  const [bounds,setBounds] = useState(null);

  let width;
  if(props.width === true){
    width = '58.5%';
  }else{
    width = '85.3%';
  }

  const mapStyles = {
    width: width,
    height: '89.5%'
  };

  const displayMarkers = () => {
      return props.locations.map((location, index) => {
        return <Marker
                key={index}
                id={index}
                position={{
                  lat: location.latitude,
                  lng: location.longitude
                }}
                onClick={() => console.log("You clicked me!")}
                title={"$100"}
                name={"location.name"}
                icon={{
                  url: `https://chart.googleapis.com/chart?chst=d_map_spin&chld=1|0|FFFFFF|10|b|$ ${location.listing_price}`,
                }}
                />
      })
    }

  return(
    <div>
      <Map
        google={props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{ lat: lat, lng: long}}
        bounds={bounds}
      >
      {displayMarkers()}
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g'
})(MapContainer);
