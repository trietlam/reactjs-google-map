/* global google */
import React from "react"
import { compose, withProps, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import './MapContainer.css'
var carIconN = require('../assets/car-n.png')
var carIconW = require('../assets/car-w.png')
var carIconS = require('../assets/car-s.png')
var carIconE = require('../assets/car-e.png')
var carIconNW = require('../assets/car-nw.png')
var carIconNE = require('../assets/car-ne.png')
var carIconSE = require('../assets/car-se.png')
var carIconSW = require('../assets/car-sw.png')

function getCarIcon(angle){
    if (angle < -158){return carIconW}
    if (angle < -113){return carIconSW}
    if (angle < -68){return carIconS}
    if (angle < -23){return carIconSE}
    if (angle < 23){return carIconE}
    if (angle < 68){return carIconNE}
    if (angle < 113){return carIconN}
    if (angle < 158){return carIconNW}
    if (angle <= 180){return carIconW}  
    return carIconN
}

const TCMapComponent = withScriptjs(withGoogleMap((props) =>{  
  
  let myArray = []
  Object.entries(props.markers).forEach(([key, value])=>myArray.push(value))
  let displayInfo = ''
  if (props.showInfo)
  {
    displayInfo = props.showInfo.deviceId    
  }

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={props.center}>  
      {myArray.map((value)=>{
        var carMarker = {
            url: getCarIcon(value.angle),
            scaledSize: new google.maps.Size(25, 25)
        };
        return(
            <Marker options={{icon: carMarker}}
              position={{lat:value.coords.latitude,lng:value.coords.longitude}}
              key={value.deviceId} 
              name={value.deviceId}
              speed={value.speed}
              engineRPM = {value.engineRPM}
              fuelLevel = {value.fuelLevel}
              onClick={() => props.onMarkerClick(value)}>
              {
                (displayInfo === value.deviceId) && (
                <InfoWindow onCloseClick={props.onInfoWindowClose}>
                  <div className="InfoWindow">
                    <p>{value.deviceId}</p>
                    -latitude: {value.coords.latitude}<br/>
                    -longitude: {value.coords.longitude}<br/>
                    -speed: {value.speed}<br/>
                    -engineRPM: {value.engineRPM}<br/>
                    -fuelLevel: {value.fuelLevel}<br/>
                  </div>
                </InfoWindow>
                )
              }              
            </Marker>
        )}
      )
      }
    </GoogleMap>
  )
}))

export default TCMapComponent