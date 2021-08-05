import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClienteLogado } from "../cliente/clienteLogado.service";
import { ClienteVerificaCadastro } from "../cliente/clienteVefificaCadastro.service";
import { Cliente } from "../cliente/shared/cliente";
import { ClienteService } from "../cliente/shared/cliente.service";

@Injectable({
  providedIn: 'root'
})
export class CalculaFrete {

  endereco: any;
  distancia: number;
  precoFrente: number = 0;
  dadosCliente: any;
  enderecoEstenco: string;
  freteCarregado: number = 1;
  semEndereco = false;

  constructor(private http: HttpClient, private clienteVerificaCadastro: ClienteVerificaCadastro, private clienteLogado: ClienteLogado,
    private clienteService: ClienteService) { }

  calculaFrete(carrinhoComponent, callBack) {
    const distribuidaora = new google.maps.LatLng(-15.5834112, -56.0756531);
    if(this.freteCarregado == 1){
      if (this.clienteVerificaCadastro.dadosCliente.enderecoBairro != null || this.clienteVerificaCadastro.dadosCliente.enderecoBairro != undefined) {
        this.endereco = new google.maps.LatLng(this.clienteVerificaCadastro.dadosCliente.coordenadas)
        this.distancia = google.maps.geometry.spherical.computeDistanceBetween(distribuidaora, this.endereco)
        this.precoFrente = parseInt(((this.distancia / 1000) * 2.2).toFixed(0))
        this.freteCarregado = 2;
        if(this.precoFrente < 5 || this.precoFrente == 0){
          this.precoFrente = 5
          callBack(carrinhoComponent, this.precoFrente)
        }else{
          callBack(carrinhoComponent, this.precoFrente)
        }
      } else {
        this.precoFrente = 5;
        callBack(carrinhoComponent, this.precoFrente)
      }
    } else if(this.freteCarregado == 3){
      if (this.clienteVerificaCadastro.dadosCliente.enderecoBairro != null || this.clienteVerificaCadastro.dadosCliente.enderecoBairro != undefined) {
        this.enderecoEstenco = this.clienteVerificaCadastro.dadosCliente.enderecoRua + ' ' 
        + this.clienteVerificaCadastro.dadosCliente.enderecoNumero + ' ' 
        + this.clienteVerificaCadastro.dadosCliente.enderecoBairro

        this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=${this.enderecoEstenco}&key=AIzaSyAPzJUkWa3xc7cgGN840g00qlBLYTpJLjY`).subscribe(dados => {
          this.endereco = new google.maps.LatLng(dados['results'][0].geometry['location'])
          this.distancia = google.maps.geometry.spherical.computeDistanceBetween(distribuidaora, this.endereco);
          this.precoFrente = parseInt(((this.distancia / 1000) * 2.2).toFixed(0))
          if(this.precoFrente < 5 || this.precoFrente == 0){
            this.precoFrente = 5
            callBack(carrinhoComponent, this.precoFrente)
          }else {
            callBack(carrinhoComponent, this.precoFrente)
          }
        });
        this.freteCarregado = 2;
      } else {
        this.precoFrente = 5;
        this.semEndereco = true;
        callBack(carrinhoComponent, this.precoFrente)
      }
    }
  }

  pegaCoordenadas(cliente: Cliente) {
    if (cliente.enderecoBairro != null || cliente.enderecoBairro != undefined) {
      var enderecoEstenco = cliente.enderecoRua + ' ' + cliente.enderecoNumero + ' ' + cliente.enderecoBairro
      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?&quotaUser=${this.clienteLogado.cliente.id}&address=${enderecoEstenco}&key=AIzaSyAPzJUkWa3xc7cgGN840g00qlBLYTpJLjY`).subscribe(dados => {
        cliente.coordenadas = dados['results'][0].geometry['location']
        this.clienteService.insertCliente(cliente)
      })
    }
  }
}