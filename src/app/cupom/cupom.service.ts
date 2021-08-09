import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Cupom } from "./cupom";

@Injectable({
  providedIn: 'root'
})
export class CupomService {

  constructor(private db: AngularFireDatabase, private router: Router) { }

  insertCupom(cupom: Cupom) {
    this.db.list('cupom').update(cupom.chave, cupom)
    alert("Cupom Cadastrado com Sucesso!");
    this.router.navigate(['/admin/menu/cupom'])
  }

  getAllCupom(chave: string) {
    return this.db.list(`cupom/${chave}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => c.payload.exportVal());
        })
      );
  }

  getAllCupons() {
    return this.db.list(`cupom`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
  }

  deleteCupom(key: string) {
    this.db.object(`cupom/${key}`).remove();
    alert("Cupom Apagado com Sucesso!")
  }
}