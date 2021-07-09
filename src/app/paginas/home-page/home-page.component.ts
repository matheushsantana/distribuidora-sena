import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteVerificaCadastro } from 'src/app/cliente/clienteVefificaCadastro.service';
import { Produto } from 'src/app/produtos/shared/produto';
import { ProdutoDataService } from 'src/app/produtos/shared/produto-data.service';
import { ProdutoService } from 'src/app/produtos/shared/produto.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})

export class HomePageComponent implements OnInit {

  produtos: Observable<Produto[]>;
  imgPadrao = 'assets/pre-carregamento-prod.gif';

  constructor(private produtoService: ProdutoService, private produtoDataService: ProdutoDataService, private clienteVerificaCadastro: ClienteVerificaCadastro,
    private router: Router) { }

  ngOnInit(): void {
    this.produtos = this.produtoService.getAllProduto();
  }

  buscaEspecifica(chave: string) {
  }

  selecionaProduto(produto: Produto, key: string) {
    this.produtoDataService.changeProduto(produto, key);
  }

}
