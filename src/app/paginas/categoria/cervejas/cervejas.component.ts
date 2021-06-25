import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/produtos/shared/produto';
import { ProdutoDataService } from 'src/app/produtos/shared/produto-data.service';
import { ProdutoService } from 'src/app/produtos/shared/produto.service';

@Component({
  selector: 'app-cervejas',
  templateUrl: './cervejas.component.html',
  styleUrls: ['./cervejas.component.css']
})
export class CervejasComponent implements OnInit {

  produtos: Observable<Produto[]>;

  constructor(private produtoService: ProdutoService, private produtoDataService: ProdutoDataService) { }

  ngOnInit(): void {
    this.produtos = this.produtoService.getAllProduto();
  }

  selecionaProduto(produto: Produto, key: string) {
    this.produtoDataService.changeProduto(produto, key);
  }

  voltaPagina(){
    window.history.back()
  }

}
