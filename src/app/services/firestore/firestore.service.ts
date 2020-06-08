import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import { User } from '../../models/user';
import { Product } from 'src/app/models/product';
import { Playlist } from 'src/app/models/playlist';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  constructor(private db:AngularFirestore) { }

  registerUser(newUser:User){
    return this.db.collection('users').doc(newUser.id).set(newUser)
  }

  createNewID(){
    return this.db.createId()

  }

  getUser(id:string){
    return this.db.collection('users').doc(id).get().toPromise()
  }

  addProduct(product:Product){
    return this.db.collection('products').doc(product.id).set(product)
  }

  updatePlaylist(userId: string, list: Playlist) {
    return this.db.doc(`users/${userId}/playlists/${list.id}`).set(list);
  }

  updateUser(user:User){
    return this.db.doc(`users/${user.id}`).set(user)
  }

  queryFor(str:string, type?:"video"|"music"){
    if(type){
      return this.db.collection(str, ref => ref.where("type","==",type)).get().toPromise()
    } else {
      return this.db.collection(str).get().toPromise()
    }
  }

  get(doc:string){
    return this.db.doc(doc).get().toPromise()
  }

  addField(){
    this.db.collection('products').get().toPromise().then((data)=>{
      data.docs.forEach((doc)=>{
        if(doc.data().type == "music"){
          doc.ref.set({price: 350},{merge: true})
        } else {
          doc.ref.set({price: 500},{merge: true})
        }
      })
    })
  }
}
