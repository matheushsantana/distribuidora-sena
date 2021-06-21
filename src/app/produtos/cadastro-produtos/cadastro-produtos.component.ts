import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilesService } from '../files.service';
import { FileEntry } from '../models/fileentry.model';
import { Produto } from '../shared/produto';
import { ProdutoService } from '../shared/produto.service';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit {

  produto: Produto
  key: string = '';

  files: FileEntry[] = [];
  @Output() droppedfiles = new EventEmitter<FileList>();

  constructor(private produtoService: ProdutoService, private filesService: FilesService) { }

  ngOnInit() {
    this.produto = new Produto();
    this.produto.linkImg = 'null';
  }

  onSubmit() {
    this.produtoService.insertProduto(this.produto);
    this.produto = new Produto();
  }

  onDropFiles(files: FileList){
    this.files.splice(0, this.files.length)
    for (let i=0; i< files.length; i++)
      this.files.push({
        file: files.item(i), percentage: null, uploading: null,
        bytesuploaded: null, canceled: null, error: null, finished: null,
        pauser: null, state: null, task: null
      });
  }

  selectEvent(event: DragEvent){
    event.preventDefault();
    this.droppedfiles.emit(event.dataTransfer.files)
  }

  removeFileFromList(i){
    this.files.splice(i, 1) 
  }

  uploadAll(){
    for(let i=0; i < this.files.length; i++)
      this.filesService.upload(this.files[i]);
  }


}
