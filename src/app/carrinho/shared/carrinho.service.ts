import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Carrinho } from './carrinho';
import { map } from 'rxjs/operators';
import { Contador } from './contador';
import { ClienteLogado } from 'src/app/cliente/clienteLogado.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private db: AngularFireDatabase, private clienteLogado: ClienteLogado, private router: Router) { };

  ngOnInit() {
  }

  atualizaCarrinho(id: number, carrinho: Carrinho) {
    this.db.list('cliente/' + this.clienteLogado.cliente.id + '/carrinho/produtos').update(id.toString(), carrinho)
      .catch((error: any) => {
        console.error(error);
      });
  }

  deletarCarrinho() {
    this.db.list('cliente/' + this.clienteLogado.cliente.id + '/carrinho').remove()
  }

  adicionaProduto(contador: Contador, carrinho: Carrinho, qtdProds: Contador) {
    var aux = contador.valor.toString()
    this.db.list('cliente/' + this.clienteLogado.cliente.id + '/carrinho/produtos').update(aux, carrinho)
      .catch((error: any) => {
        console.error(error);
      });
    this.atualziaContador(contador);
    alert("Produto Adicionado");
    this.qtdProdutos(qtdProds)
    this.router.navigate(['/opcao'])
  }

  atualziaContador(contador: Contador) {
    contador.valor = contador.valor + 1;
    this.db.list('cliente/' + this.clienteLogado.cliente.id + '/carrinho').update('contador', contador)
      .catch((error: any) => {
        console.error(error);
      });
  }

  atualziaContador2(contador: Contador) {
    this.db.list('cliente/' + this.clienteLogado.cliente.id + '/carrinho').update('contador', contador)
      .catch((error: any) => {
        console.error(error);
      });
  }

  getContadorCarrinho() {
    return this.db.list('cliente/' + this.clienteLogado.cliente.id + '/carrinho')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
  }


  getAllProdCarrinho() {
    return this.db.list('cliente/' + this.clienteLogado.cliente.id + '/carrinho/produtos')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
  }

  getAllPedido() {
    return this.db.list('cliente/' + this.clienteLogado.cliente.id)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
  }

  deleteProdCarrinho(key: string, aux: number) {
    this.db.object('cliente/' + this.clienteLogado.cliente.id + '/carrinho/produtos/' + `${key}`).remove();

    if (aux == 1) {
      var cont: Contador;
      cont = new Contador();
      cont.valor = 0;
      this.atualziaContador2(cont)
    }
  }

  getContadorPedido() {
    return this.db.list('contador')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
  }
  atualizarContadorPedido(contador: Contador) {
    contador.valor = contador.valor + 1;
    this.db.list('contador').update('ContadorPedido', contador)
      .catch((error: any) => {
        console.error(error);
      });
  }

  qtdProdutos(aux: Contador) {
    this.db.list('cliente/' + this.clienteLogado.cliente.id + '/qtdProdutos').update('valor', aux)
      .catch((error: any) => {
        console.error(error);
      });
  }

  pegaQtdProds() {
    return this.db.list('cliente/' + this.clienteLogado.cliente.id + '/qtdProdutos')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
  }

  alteraQtdProds(valor: number) {
    var aux = new Contador();
    aux.valor = valor - 1
    this.db.list('cliente/' + this.clienteLogado.cliente.id + '/qtdProdutos').update('valor', aux)
    .catch((error: any) => {
      console.error(error);
    });
  }

}
