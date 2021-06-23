import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrinho } from './shared/carrinho';
import { CarrinhoService } from './shared/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  carrinho: Observable<any>;
  produtos: Carrinho [] = [];
  qtd: number;
  total: number = 0 ;
  quantidade: number = 1;

  url = 'https://sena-distribuidora-default-rtdb.firebaseio.com/cliente/';

  constructor(private carrinhoService: CarrinhoService, private http: HttpClient){
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.carrinho = this.carrinhoService.getAllProdCarrinho();
      this.conta();
     }, 2000);

  }

  removeProduto(key: string){
    this.carrinhoService.deleteProdCarrinho(key);
  }

  quantidadeAltera(valor: number){
    if(valor >= 1){
      this.quantidade = this.quantidade + valor;
      this.total = this.quantidade ;
    }else if(valor === 0){
      if(this.quantidade >= 2){
        this.quantidade--;
        this.total = this.total  ;
      }
    }
  }

  listarCarrinho(){
    return this.http.get<any[]>(`${this.url + this.carrinhoService.idCliente + '/carrinho.json'}`);
  }

  conta(){

    this.listarCarrinho().subscribe(dados => {
      this.produtos = dados;
      console.log(this.produtos)
      this.qtd = (Object.keys(this.produtos).length)
    }, err => {
      console.log('Erro ao listar os sistemas', err);
    })
    console.log('saiu')
  }

  totalPedido(){

  }

}
