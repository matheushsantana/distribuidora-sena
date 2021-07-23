import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Produto } from 'src/app/produtos/shared/produto';
import { ProdutoDataService } from 'src/app/produtos/shared/produto-data.service';
import { ProdutoService } from 'src/app/produtos/shared/produto.service';

@Component({
  selector: 'app-tabacaria',
  templateUrl: './tabacaria.component.html',
  styleUrls: ['./tabacaria.component.css']
})
export class TabacariaComponent implements OnInit {

  produtos: Observable<Produto[]>;
  imgPadrao = 'assets/pre-carregamento-prod.gif'

  constructor(private produtoService: ProdutoService, private produtoDataService: ProdutoDataService, private location: Location) { }

  ngOnInit(): void {
    this.produtos = this.produtoService.getAllProduto();
  }

  selecionaProduto(produto: Produto, key: string) {
    this.produtoDataService.changeProduto(produto, key);
  }

  voltaPagina(){
    this.location.back();
  }

}
