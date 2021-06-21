import { Component, OnInit } from '@angular/core';
import { Produto } from '../shared/produto';
import { ProdutoDataService } from '../shared/produto-data.service';
import { ProdutoService } from '../shared/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  produto: Produto
  key: string = '';
  uploadFoto = false;
  fotoAtual = true;

  constructor(private produtoDataService: ProdutoDataService, private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produto = new Produto();
    this.produtoDataService.currentProduto.subscribe(data => {
      if(data.produto && data.key){
        this.produto = new Produto();
        this.produto.nome = data.produto.nome;
        this.produto.valor = data.produto.valor;
        this.produto.categoria = data.produto.categoria;
        this.produto.linkImg = data.produto.linkImg;
        this.key = data.key;
      }
    })
  }

  onSubmit(){
    if(this.key){
      this.produtoService.updateProduto(this.produto, this.key);
    }
    this.produto = new Produto();
  }

}
