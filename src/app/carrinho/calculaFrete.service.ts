import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClienteVerificaCadastro } from "../cliente/clienteVefificaCadastro.service";

@Injectable({
    providedIn: 'root'
  })
  export class CalculaFrete {

    endereco: any;
    enderecoEstenco: string;
    distancia: number;
    precoFrente: number = 0;
    dadosCliente: any;
    semEndereco = false;

    constructor(private http: HttpClient, private clienteVerificaCadastro: ClienteVerificaCadastro){}

    calculaFrete(){
        const distribuidaora = new google.maps.LatLng(-15.5834112, -56.0756531);
        if (this.clienteVerificaCadastro.dadosCliente.enderecoBairro != null || this.clienteVerificaCadastro.dadosCliente.enderecoBairro != undefined) {
          this.enderecoEstenco = this.clienteVerificaCadastro.dadosCliente.enderecoRua + ' ' 
          + this.clienteVerificaCadastro.dadosCliente.enderecoNumero + ' ' 
          + this.clienteVerificaCadastro.dadosCliente.enderecoBairro
        } else {
          this.precoFrente = 5;
          this.semEndereco = true;
        }
        if(this.semEndereco == false){
          this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=${this.enderecoEstenco}&key=AIzaSyAPzJUkWa3xc7cgGN840g00qlBLYTpJLjY`).subscribe(dados => {
          this.endereco = new google.maps.LatLng(dados['results'][0].geometry['location'])
          this.distancia = google.maps.geometry.spherical.computeDistanceBetween(distribuidaora, this.endereco);
          this.precoFrente = parseInt(((this.distancia / 1000) * 2.2).toFixed(0))
          if(this.precoFrente < 5 || this.precoFrente == 0){
            this.precoFrente = 5
          }
        });
        }
        
      }
  }