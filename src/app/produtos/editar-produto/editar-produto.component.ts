import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { FileEntry } from '../models/fileentry.model';
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
  trocaFoto = false;
  escondeBotao = true;
  nameFile = true;

  files: FileEntry[] = [];

  constructor(private produtoDataService: ProdutoDataService, private produtoService: ProdutoService, private filesService: FilesService) { }

  ngOnInit() {
    this.produto = new Produto();
    this.produtoDataService.currentProduto.subscribe(data => {
      if(data.produto && data.key){
        this.produto = new Produto();
        this.produto.nome = data.produto.nome;
        this.produto.valor = data.produto.valor;
        this.produto.categoria = data.produto.categoria;
        this.produto.imgProduto = data.produto.imgProduto;
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

  delete(key: string){
    var aux = confirm("Tem certeza que deseja apagar esse produto? os dados seram perdidos para sempre!")
    if(aux == true){
      if(this.produto.imgProduto != 'assets/produto-sem-imagem.png'){
        this.filesService.deleteFile(this.produto.imgProduto)
      }
      this.produtoService.deleteProduto(key);
    }
  }

  trocaImgProd(){
    this.trocaFoto = true
  }

  onDropFiles(files: FileList){
    this.escondeBotao = true;
    this.nameFile = true;
    this.files.splice(0, this.files.length)
    for (let i=0; i< files.length; i++){
      this.files.push({
        file: files.item(i), percentage: null, uploading: null,
        bytesuploaded: null, canceled: null, error: null, finished: null,
        pauser: null, state: null, task: null
      });
    }
  }

  removeFileFromList(i){
    this.files.splice(i, 1) 
  }

  deletarFoto(){
    this.filesService.deleteFile(this.produto.imgProduto)
    this.escondeBotao = true;
    this.produto.imgProduto  ='assets/produto-sem-imagem.png';
    this.nameFile = false;
  }

  uploadAll(){
    if(this.produto.imgProduto != 'assets/produto-sem-imagem.png'){
      this.filesService.deleteFile(this.produto.imgProduto)
    }
    this.escondeBotao = false;
    for(let i=0; i < this.files.length; i++){
      this.filesService.upload(this.files[i], this.produto.categoria);
    }
    

    setTimeout(() => {
      this.produto.imgProduto = this.filesService.urlfotoProd;
    }, 2000)
  }

}
