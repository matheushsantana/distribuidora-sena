import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrinhoService } from './shared/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  carrinho: Observable<any>;

  total: number = 0 ;

  constructor(private carrinhoService: CarrinhoService){
  }

  ngOnInit(): void {
    this.carrinho = this.carrinhoService.getAllProdCarrinho();
  }

  removeProduto(key: string){
    this.carrinhoService.deleteProdCarrinho(key);
  }

}
