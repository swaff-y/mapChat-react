import React, {useEffect, useState} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = (props) => {

  const [points, setPoints] = useState([{lat:0,lng:0}]);
  const [loaded, setLoaded] = useState(false);
  // const [bounds,setBounds] = useState(null);

  useEffect(()=>{
    let rest = points;
    rest.shift();
    props.messages.forEach((message)=>{
      rest.push({lat:message.latitude, lng:message.longitude});
    })
    setPoints(rest)
    setLoaded(true);
  },[])

  console.log("The Points: ", points, props.messages);

  // const points = [
  //   { lat: 34.02, lng: -82.01 },
  //   { lat: 42.03, lng: -77.02 },
  //   { lat: 35.03, lng: -80.04 },
  //   { lat: 44.05, lng: -70.02 }
  // ]
  const bounds = new props.google.maps.LatLngBounds();
  for (var i = 0; i < points.length; i++) {
    bounds.extend(points[i]);
  }

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
      // console.log("inside points:", points);
      return props.messages.map((message, index) => {
        return <Marker
                key={index}
                id={index}
                position={{
                  lat: message.latitude,
                  lng: message.longitude
                }}
                onClick={() => console.log("You clicked me!")}
                title={"$100"}
                name={"location.name"}
                icon={{
                  url: `https://chart.googleapis.com/chart?chst=d_fnote&chld=thought|1|0088FF|h|${message.message}|another line|one more line`,
                }}
                />
      })
    }

  return(
    <div>
    {
      loaded === true ? <Map
              google={props.google}
              zoom={10}
              style={mapStyles}
              initialCenter={{ lat: -33.8688197, lng:151.2092955 }}
              bounds={bounds}
            >
            {displayMarkers()}
            </Map> : <p>Loading....</p>
    }

    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g'
})(MapContainer);
