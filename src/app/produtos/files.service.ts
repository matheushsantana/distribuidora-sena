import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { catchError, finalize, map } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { FileEntry } from './models/fileentry.model';

@Injectable({
    providedIn: 'root'
  })
  export class FilesService {
  

    urlfotoProd: string;
  
    constructor(private storage: AngularFireStorage) {}
  
    uploadFile(f: File) {
      let path = `myfiles/${f.name}`;
      let task = this.storage.upload(path, f)
      task.snapshotChanges()
        .subscribe((s) => console.log(s))
    }
  
    upload(f: FileEntry, caminho: string) {
      let newfilename = `${(new Date()).getTime()}_${f.file.name}`;
      let path = `imgProdutos/${caminho}/${newfilename}`;
      f.task = this.storage.upload(path, f.file)
      f.state = f.task.snapshotChanges()
        .pipe(
          map((s) => f.task.task.snapshot.state),
          catchError(s => {
            return of(f.task.task.snapshot.state)
          })
        )
      this.fillAtributes(f);
      f.task.snapshotChanges().pipe(
        finalize(() => {
          if (f.task.task.snapshot.state == "success") {
            this.storage.ref(`imgProdutos/${caminho}/${newfilename}`).getDownloadURL().subscribe(dados => {
              this.urlfotoProd = dados
            })
          }
        })
      )
      .subscribe();
    }
  
    fillAtributes(f: FileEntry) {
      f.percentage = f.task.percentageChanges();
      f.uploading = f.state.pipe(map((s) => s == "running"));
      f.finished = from(f.task).pipe(map((s) => s.state == "success"));
      f.pauser = f.state.pipe(map((s) => s == "paused"));
      f.error = f.state.pipe(map((s) => s == "error"));
      f.canceled = f.state.pipe(map((s) => s == "canceled"));
      f.bytesuploaded = f.task.snapshotChanges().pipe((map(s => s.bytesTransferred)));
    }
  
    deleteFile(url: string){
      this.storage.refFromURL(url).delete();
    }
  }