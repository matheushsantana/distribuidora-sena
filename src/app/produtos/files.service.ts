import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileEntry } from './models/fileentry.model';
import { catchError, finalize, map } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MyFile } from './models/myfile.model';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private filesCollection: AngularFirestoreCollection<MyFile>;

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore) {
    this.filesCollection = afs.collection('myfiles', ref => ref.orderBy('date'));
  }

  uploadFile(f: File) {
    let path = `myfiles/${f.name}`;
    let task = this.storage.upload(path, f)
    task.snapshotChanges()
      .subscribe((s) => console.log(s))
  }

  upload(f: FileEntry) {
    let newfilename = `${(new Date()).getTime()}_${f.file.name}`;
    let path = `myfiles/${newfilename}`;
    f.task = this.storage.upload(path, f.file);
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
          this.filesCollection.add({
            filename: f.file.name, 
            path: path,
            date: (new Date()).getTime(), 
            size: f.file.size
          });
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

  getFiles(): Observable<MyFile[]> {
    return this.filesCollection.snapshotChanges()
      .pipe(map((actions) => {
        return actions.map(a => {
          const file: MyFile = a.payload.doc.data();
          const id = a.payload.doc.id;
          const url = this.storage.ref(file.path).getDownloadURL();
          return { id, ...file, url };
        })
      }))
  }

  deleteFile(f: MyFile){
    this.storage.ref(f.path).delete();
    this.filesCollection.doc(f.id).delete();
  }
}
