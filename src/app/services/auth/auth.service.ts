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
          localStorage.setItem('userLogged', JSON.stringify(data.data()));
        })
      } else {
        localStorage.setItem('userLogged', null);  
      }
    })
  }

  logInWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject)=>{
      this.auth.auth.signInWithEmailAndPassword(email, password).then((value)=>{
        this.db.getUser(value.user.uid).then(dUser => {
          localStorage.setItem('userLogged', JSON.stringify(dUser.data()));
          resolve()
        })
      }).catch(err => reject(err));
    }) 
  }

  registerUserWithEmailAndPassword(email, password){
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  logOut() {
    return new Promise((resolve, reject) => {
      this.auth.auth.signOut().then(() => {
        localStorage.setItem('userLogged', null);
        resolve()
      })
    })
  }

  isLoggedIn(){
    if(JSON.parse(localStorage.getItem('userLogged')) != null){
      return true;
    } else {
      return false;
    }
  }

  isBirthDay(){
    if(this.isLoggedIn()){
      let today = new Date()
      let user = this.getUser() as any
      let userBirthday = new Date(0)
      userBirthday.setSeconds(user.birthDate.seconds)
      if(today.getUTCDate() == userBirthday.getUTCDate()
      && today.getUTCMonth() == userBirthday.getUTCMonth()) {
        return true
      } else {
        return false
      }
    }
  }

  isBirthMonth(){
    if(this.isLoggedIn()){
      let today = new Date()
      let user = this.getUser() as any
      let userBirthday = new Date(0)
      userBirthday.setSeconds(user.birthDate.seconds)
      if(today.getUTCMonth() == userBirthday.getUTCMonth()) {
        return true
      } else {
        return false
      }
    }
  }

  changePlan(newPlan:"demand"|"music"|"video"|"premium"){
    let newUser = this.getUser()
    newUser.subscription = newPlan
    localStorage.setItem('userLogged', JSON.stringify(newUser));
    return this.db.updateUser(newUser)
  }

  getUser():User{
    return JSON.parse(localStorage.getItem('userLogged')) as User
  }
}
