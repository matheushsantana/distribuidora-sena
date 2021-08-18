import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ReportBug } from './report-bug';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportBugService {

  constructor(private db: AngularFireDatabase, private router: Router) { }

  insertBug(bug: ReportBug){
    this.db.list('bug').push(bug)
    .then((result: any) =>{
      console.log(result.key);
    });
    alert("Obrigado pelo feedback!");
    this.router.navigate(['/meu-perfil']);
  }

  getAllBug(){
    return this.db.list('bug')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
      })
    );
  }

  deleteBug(key: string){
    this.db.object(`bug/${key}`).remove();
    alert("Apagado com Sucesso!")
  }
}
