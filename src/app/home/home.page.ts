import { Component, ViewChild } from '@angular/core';
import { Map, tileLayer, marker, polyline } from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: Map;
  latLong: Array<number> = [];
  maker:any;
  polyline: Array<any> = [];
  @ViewChild('mapId')
  mapDiv: any;

  constructor() {
    this.latLong.push(-19.774414);
    this.latLong.push(-43.983566);
  }

  loadmap() {
    this.map = new Map('mapId').setView(this.latLong, 15);
    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);

    this.map.on('click', this.clickMap, this);

  }

  clickMap(e){
    if(this.polyline)
      this.polyline.push([e.latlng.lat,e.latlng.lng]);
    else
      this.polyline = [[e.latlng.lat,e.latlng.lng]];

    if(this.maker)
      e.target.removeLayer(this.maker);

    this.maker = marker([e.latlng.lat,e.latlng.lng]).addTo(e.target)
    .bindPopup('Lat e lng: '+ e.latlng)
    .openPopup();

    polyline(this.polyline).addTo(e.target);

  }

  ionViewDidEnter() { 
    this.loadmap();
  }

  ionViewWillLeave() {
    this.map.remove();
  }

}
