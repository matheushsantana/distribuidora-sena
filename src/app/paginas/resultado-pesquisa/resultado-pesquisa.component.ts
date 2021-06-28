import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/produtos/shared/produto';
import { ProdutoDataService } from 'src/app/produtos/shared/produto-data.service';
import { ProdutoService } from 'src/app/produtos/shared/produto.service';


@Component({
  selector: 'app-resultado-pesquisa',
  templateUrl: './resultado-pesquisa.component.html',
  styleUrls: ['./resultado-pesquisa.component.css']
})
export class ResultadoPesquisaComponent implements OnInit {

  produtos: Observable<Produto[]>;
  term: string;

  constructor(private produtoService: ProdutoService, private produtoDataService: ProdutoDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.produtos = this.produtoService.getAllProduto();
    this.route.params.subscribe(params => this.term = params['produto']);
  }

  selecionaProduto(produto: Produto, key: string) {
    this.produtoDataService.changeProduto(produto, key);
  }
  
  voltaPagina(){
    window.history.back()
  }

}