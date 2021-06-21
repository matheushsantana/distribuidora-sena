import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../shared/produto';
import { ProdutoDataService } from '../shared/produto-data.service';
import { ProdutoService } from '../shared/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  produtos: Observable<any>;
  id: Observable<any>;

  constructor(private produtoService: ProdutoService, private produtoDataService: ProdutoDataService) { }

  ngOnInit(): void {
    this.produtos = this.produtoService.getAllProduto();
  }

  delete(key: string){
    this.produtoService.deleteProduto(key);
  }

  edit(produto: Produto, key: string) {
    this.produtoDataService.changeProduto(produto, key);
  }

}
