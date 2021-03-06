import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { User } from './user';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { Carrinho } from '../carrinho/shared/carrinho';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');
  carrinho: Carrinho;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  register(user: User, senha: string): Observable<boolean> {
    return from(this.afAuth
      .createUserWithEmailAndPassword(user.email, senha))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) =>
          this.userCollection.doc(u.user.uid)
            .set({ ...user, id: u.user.uid })
            .then(() => true)
        ),
        catchError((err) => throwError(err)),
      )
  }

  login(email: string, password: string): Observable<User> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) => this.userCollection.doc<User>(u.user.uid).valueChanges()),
        catchError(() => throwError('Invalid credemtials or user is not registered.'))
      )
  }

  logout() {
    this.afAuth.signOut();
  }

  getUser(): Observable<User> {
    return this.afAuth.authState
      .pipe(
        switchMap(u => (u) ?
          this.userCollection.doc<User>(u.uid).valueChanges() : of(null))
      )
  }

  authenticated(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(map(u => (u) ? true : false)
      )
  }

  usuarioAutenticado(){
    return this.afAuth.authState
  }

  loginGoogle(): Observable<User> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(provider))
      .pipe(
        tap((data) => console.log(data)),
        switchMap((u: firebase.auth.UserCredential) => {
          const newUser: User = {
            firsname: u.user.displayName,
            email: u.user.email,
            fotoPerfil: u.user.photoURL,
            id: u.user.uid,
            tipo: 'cliente'
          };
          return this.userCollection.doc(u.user.uid)
            .set(newUser).then(() => newUser);
        })
      )
  }
}
