import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/produtos/shared/produto';
import { ProdutoDataService } from 'src/app/produtos/shared/produto-data.service';
import { ProdutoService } from 'src/app/produtos/shared/produto.service';

@Component({
  selector: 'app-menu-produtos',
  templateUrl: './menu-produtos.component.html',
  styleUrls: ['./menu-produtos.component.css']
})
export class MenuProdutosComponent implements OnInit {

  produtos: Observable<Produto[]>;
  imgPadrao = 'assets/pre-carregamento-prod.gif'
  produtoPesquisado: any;

  constructor(private produtoService: ProdutoService, private produtoDataService: ProdutoDataService) { }


  ngOnInit(): void {
    this.produtos = this.produtoService.getAllProduto();
  }

  edit(produto: Produto, key: string) {
    this.produtoDataService.changeProduto(produto, key);
  }

}
