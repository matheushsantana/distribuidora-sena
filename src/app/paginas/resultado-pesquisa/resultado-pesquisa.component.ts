import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  imgPadrao = 'assets/pre-carregamento-prod.gif'

  constructor(private produtoService: ProdutoService, private produtoDataService: ProdutoDataService, private route: ActivatedRoute,
     private location: Location) { }

  ngOnInit(): void {
    this.produtos = this.produtoService.getAllProduto();
    if(this.route.params['_value'].produto == 'undefined'){
      this.term = ''
    }else {
      this.route.params.subscribe(params => this.term = params['produto']);
    }
    setTimeout(() => {
      var site = document.getElementById('component').style
      site.display = 'block';
      var carregamento = document.getElementById('carregando')
      carregamento.classList.add("hide")
    }, 1000)
  }

  selecionaProduto(produto: Produto, key: string) {
    this.produtoDataService.changeProduto(produto, key);
  }
  
  voltaPagina(){
    this.location.back();
  }

}
