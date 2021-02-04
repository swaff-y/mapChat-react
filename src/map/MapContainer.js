import React, {useEffect, useState} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = (props) => {

  const [loaded, setLoaded] = useState(false);
  const [bound, setBound] = useState();
  const [obj, setObj] = useState({});

  const bounds = new props.google.maps.LatLngBounds();
  for (var i = 0; i < props.points.length; i++) {
    bounds.extend(props.points[i]);
  }

  useEffect(()=>{
    setBound(bounds)
    setLoaded(true)
  },[])

  function wordWrap(str, maxWidth) {
      let newLineStr = "*";
      let done = false;
      let res = '';
      while (str.length > maxWidth) {
          let found = false;
          // Inserts new line at first whitespace of the line
          for (let i = maxWidth - 1; i >= 0; i--) {
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

  let width;
  if(props.width === true){
    width = '58.5%';
  }else{
    width = '85.3%';
  }

  const mapStyles = {
    position: 'absolute',
    width: width,
    height: '89.5%',
    // margin: 'auto'
  };

  const handleClick = (name) => {
    props.handleMapClick(name);
  }

  console.log("lat:", props.sortedCoOrds);

  const displayMarkers = () => {
       // console.log("Sorted CoOrds:", Object.values(props.sortedCoOrds));
       // console.log("Sorted CoOrds:", props.sortedCoOrds);
      return Object.values(props.sortedCoOrds).map((message, index) => {
        if(message.room === props.roomName){
          return <Marker
                  key={index}
                  id={index}
                  position={{
                    lat: message.latitude,
                    lng: message.longitude
                  }}
                  onClick={()=>handleClick(message.name)}
                  title={wordWrap(message.msg,14).split("*")[0]}
                  icon={{
                    url: `https://chart.googleapis.com/chart?chst=d_fnote&chld=thought|1|0088FF|h|${wordWrap(message.msg,14).split("*")[0]}|${wordWrap(message.msg,14).split("*")[1] !== undefined ? wordWrap(message.msg,14).split("*")[1] : ""}|${wordWrap(message.msg,14).split("*")[2] !== undefined ? wordWrap(message.msg,14).split("*")[2] : ""}`,
                  }}
                  />
        }
      })
    }

  return(
    <div>
    {
      props.points.length > 0 ? <Map
              google={props.google}
              zoom={15}
              style={mapStyles}
              initialCenter={{
                lat: props.latitude,
                lng: props.longitude
              }}
              bounds={loaded === true ? bounds : bound}
            >
            {loaded === true ? displayMarkers() : null}
            </Map>
            :
            <p className="app_center">No Chats on thread</p>
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
