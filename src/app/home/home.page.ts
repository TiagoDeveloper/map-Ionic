import { Component } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: Map;
  latLong: Array<number> = [];
  maker:any;

  constructor() {
    this.latLong.push(-19.774414);
    this.latLong.push(-43.983566);
  }

  loadmap() {
    this.map = new Map('mapId').setView(this.latLong, 15);
    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);

    this.map.on('click', function(e) {
      
      if(this.maker)
        e.target.removeLayer(this.maker);

      this.maker = marker([e.latlng.lat,e.latlng.lng]).addTo(e.target)
      .bindPopup('Lat e lng: '+ e.latlng)
      .openPopup();
    });

  }

  ionViewDidEnter() { 
    this.loadmap();
  }

  ionViewWillLeave() {
    this.map.remove();
  }

}
