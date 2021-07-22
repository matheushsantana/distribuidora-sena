import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class CalculaFrete {

    endereco: any;
    distancia: number;

    constructor(private http: HttpClient){}

    calculaFrete(){
        const distribuidaora = new google.maps.LatLng(-15.5834112, -56.0756531);
        this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=
        rua%20general,%20joao,%20severiano,%20da,%20fonseca,%20187,%20araes&key=AIzaSyAPzJUkWa3xc7cgGN840g00qlBLYTpJLjY`).subscribe(dados => {
          this.endereco = new google.maps.LatLng(dados['results'][0].geometry['location'])
          console.log('clinete: ', this.endereco)
        } );
        setTimeout(() => {
            console.log('distribuidora: ', distribuidaora)
          this.distancia = google.maps.geometry.spherical.computeDistanceBetween(distribuidaora, this.endereco);
          console.log('distancia: ', ((this.distancia / 1000) * 2).toFixed(0))
        }, 1500)
        
        return ((this.distancia / 1000) * 2).toFixed(0)
      }
  }