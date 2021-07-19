import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent implements OnInit {

  isDragginOver = false;


  @Output() droppedfiles = new EventEmitter<FileList>();
  constructor() { }

  ngOnInit(): void {
  }

  onDragOverEvent(event: DragEvent){
    event.preventDefault();
    this.isDragginOver = true;
  }

  onDragLeaveEvent(event: DragEvent){
    event.preventDefault();
    this.isDragginOver = false;
  }

  onDropEvent(event: DragEvent){
    console.log('entrou dropzone.ts')
    event.preventDefault();
    this.droppedfiles.emit(event.dataTransfer.files)
  }

}
