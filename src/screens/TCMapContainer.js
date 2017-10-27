import React from "react"
import _ from "lodash";
import TCMapComponent from './TCMap'
import * as Data from '../utils/data'
import * as Helper from '../utils/helper'
import openSocket from 'socket.io-client'
import './MapContainer.css'

let tmpDataTCMap = {}
tmpDataTCMap = Data.testRawData
export class TCMapContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {     
      showInfoForMarker: null,
      markers:{} };
  }

  componentDidMount() {
    const ws = openSocket('http://localhost:8080');    
    ws.on('locations', function incoming(data) {
      let diff = 1001
          if (tmpDataTCMap[data.deviceId]){
              diff = Helper.getTimeDiffFromISOString(data.timestamp, tmpDataTCMap[data.deviceId].timestamp)  
          }
          if (diff > 500) 
          {
            tmpDataTCMap[data.deviceId].angle = Helper.getAngle(data.coords, tmpDataTCMap[data.deviceId].coords)
            tmpDataTCMap[data.deviceId] = {...data};
          }                
    })      
          this.timer = setInterval(()=> this.updateMap(), 1000);
    }

    updateMap(){
        if (JSON.stringify(this.state.markers) === JSON.stringify(tmpDataTCMap))
        {
            return;
        }        
        this.setState({markers:_.cloneDeep(tmpDataTCMap)})
    }

  handleMarkerClick(selectedMarker){
    this.setState({ showInfoForMarker: selectedMarker })
  }
  
  closeInfoWindow(){
    this.setState({showInfoForMarker:null})
  }

  render() {
    return (
      <TCMapComponent        
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ position:'absolute', width: '100%', height: '95%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center = {{ lat: -36.90553, lng: 174.77062 }}
        showInfo={this.state.showInfoForMarker}
        markers={this.state.markers}
        onMarkerClick={this.handleMarkerClick.bind(this)}
        onInfoWindowClose={this.closeInfoWindow.bind(this)}
      />
    )
  }
}