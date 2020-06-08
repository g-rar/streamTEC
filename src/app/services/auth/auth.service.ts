import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { take, tap, map } from 'rxjs/operators';
import { resolve } from 'url';
import { User } from '../../models/user';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ : Observable<firebase.User>;
  firebaseUser: firebase.User = null;
  
  constructor(private auth: AngularFireAuth, private router:Router, private db:FirestoreService) { 
    this.user$ = auth.user;
    this.user$.subscribe((data) => {
      this.firebaseUser = data;
      if(data){        
        db.getUser(data.uid).then(data =>{
          console.log("data",data.data());          
          localStorage.setItem('userLogged', JSON.stringify(data.data()));
        })

      } else {
        localStorage.setItem('userLogged', null);  
      }
    })
  }

  logInWithEmailAndPassword(email, password) {
    return this.auth.auth.signInWithEmailAndPassword(email, password).then((value)=>{
      window.location.reload();
    }).catch(err => console.error(err));
  }

  registerUserWithEmailAndPassword(email, password){
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.auth.signOut()
  }

  isLoggedIn(){
    if(JSON.parse(localStorage.getItem('userLogged')) != null){
      return true;
    } else {
      return false;
    }
  }

  getUser():User{
    return JSON.parse(localStorage.getItem('userLogged')) as User
  }
}
