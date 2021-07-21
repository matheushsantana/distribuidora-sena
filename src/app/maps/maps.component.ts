import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  latitude: any;
  longitude: any;

  //AIzaSyAPzJUkWa3xc7cgGN840g00qlBLYTpJLjY

  constructor() { }

  ngOnInit(): void {
  }

  localizacao() {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 15000
    };
    navigator.geolocation.watchPosition(position => {
      this.latitude = position.coords.latitude,
        console.log('latitude: ', this.latitude)
      this.longitude = position.coords.longitude
      console.log('longitude: ', this.longitude)
      console.log('tempo: ', position.timestamp)
      console.log(position)
    }, null, options);

  }

}
