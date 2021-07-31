import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';
const iconRetinaUrl = './assets/marker-icon-2x.png';
const iconUrl = './assets/marker-icon.png';
const shadowUrl = './assets/marker-shadow.png';
const iconDefault = L.icon({ iconRetinaUrl, iconUrl, shadowUrl, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], tooltipAnchor: [16, -28], shadowSize: [41, 41] });
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewInit, OnDestroy {
  private map: L.Map;

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;
  url: 'https://www.soundsnap.com/space_hanger_alarm_tone_2_wav'
  //mymap = L.map('mapid').setView([-45.862213, -67.49656], 12);

  constructor() { }

  ngOnInit() {

  }


  ngAfterViewInit() {
    const myAPIKey = "34baa40ad1864221bf820f8a38542b89";
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";

    const initialState = {
      lng: -45.862213,
      lat: -67.49656,
      zoom: 18
    };



    const map = new L.Map(this.mapContainer.nativeElement).setView(
      [-45.862213, -67.49656],
      12
    );

    // the attribution is required for the Geoapify Free tariff plan
    map.attributionControl
      .setPrefix("")
      .addAttribution(
        'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
      );

    /* L.mapboxGL({
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      accessToken: "no-token"
    }).addTo(map); */
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);

    const marker = L.marker([-45.928983, -67.561404]).addTo(map);
    if (marker) {
      this.playSound(this.url)
    }
  }

  getIncidents(){

  }



  playSound(url) {
    const audio = new Audio(url);
    audio.play();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }


}


