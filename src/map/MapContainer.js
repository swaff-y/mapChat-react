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

  let msg = "";
  if(props.messages[0] !== undefined){
      msg = props.messages[0].message
  }

  const str = wordWrap(msg, 14);

  // console.log("The Points: ", str.split('*'));

  function wordWrap(str, maxWidth) {
      let newLineStr = "*";
      let done = false;
      let res = '';
      while (str.length > maxWidth) {
          let found = false;
          // Inserts new line at first whitespace of the line
          for (i = maxWidth - 1; i >= 0; i--) {
              if (testWhite(str.charAt(i))) {
                  res = res + [str.slice(0, i), newLineStr].join('');
                  str = str.slice(i + 1);
                  found = true;
                  break;
              }
          }
          // Inserts new line at maxWidth position, the word is too long to wrap
          if (!found) {
              res += [str.slice(0, maxWidth), newLineStr].join('');
              str = str.slice(maxWidth);
          }

      }

      return res + str;
  }

  function testWhite(x) {
      var white = new RegExp(/^\s$/);
      return white.test(x.charAt(0));
  };


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
                title={wordWrap(message.message,14).split("*")[0]}
                name={message.name}
                icon={{
                  url: `https://chart.googleapis.com/chart?chst=d_fnote&chld=thought|1|0088FF|h|${wordWrap(message.message,14).split("*")[0]}|${wordWrap(message.message,14).split("*")[1] !== undefined ? wordWrap(message.message,14).split("*")[1] : ""}|${wordWrap(message.message,14).split("*")[2] !== undefined ? wordWrap(message.message,14).split("*")[2] : ""}`,
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





// let msg;
// msg = props.messages[0].message
//
// const wrap = (s) => s.replace(
//   /(?![^-]{1,32}$)([^-]{1,32})\s/g, '$1\n'
// );
//
//  let str = wrap(msg)
//
//  let arr = [];
//
//  arr = str.split("\n");
//
// console.log("The string:", str, arr);
