import { Injectable } from '@angular/core';
import { ProductBuilder } from 'src/app/classes/productBuilder';
import { GoogleServiceService } from '../google/google-service.service';
import { Video, Product, MusicTrack } from 'src/app/models/product';
import { FirestoreService } from '../firestore/firestore.service';
import { resolve } from 'url';
import { Playlist } from 'src/app/models/playlist';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private builder:ProductBuilder = new ProductBuilder();

  constructor(private yt: GoogleServiceService, private db:FirestoreService) { }

  buyProductForUser(user:User,product:Product){
    user.ownedProducts.push(product.id)
    return this.db.updateUser(user)
  }

  getVideoFromUrl(url:string, price: number){
    return new Promise<Video>((resolve, reject)=>{
      let id = this.yt.getIdFromUrl(url)
      this.yt.getVideo(id).then((data)=>{
        let result = this.builder.buildAsVideo(data,price) as Video
        resolve(result)
      }).catch(err => reject(err))
    })
  }

  getSongFromUrl(url:string, channelMode:"stereo"|"mono", album:string, price:number){
    return new Promise<MusicTrack>((resolve, reject)=>{
      let id = this.yt.getIdFromUrl(url)
      this.yt.getVideo(id).then((data)=>{
        let result = this.builder.buildAsTrack(data, channelMode,album,price) as MusicTrack
        resolve(result)
      }).catch(err => reject(err))
    })
  }

  addNewProduct(newProduct:Product){
    return this.db.addProduct(newProduct)    
  }

  addProductToPlaylist(userId:string, product:Product, list:Playlist){
    list.productIDs.push(product.id)
    return this.db.updatePlaylist(userId, list);
  }

  addNewPlayListWithProduct(userId:string, product:Product, name:string){
    let newPlayList:Playlist = {
      id: this.db.createNewID(),
      name: name,
      userID: userId,
      productIDs: [product.id]
    }
    return this.db.updatePlaylist(userId, newPlayList)
  }

  getProductsInList(strList:string[], ordered?:boolean):Promise<Product[]>{
    return new Promise<Product[]>((resolve, reject) => {
      this.db.getProductsInList(strList).then((data) => {
        let res = []
        data.docs.forEach((doc)=>{
          res.push(doc.data() as Product)
        })
        if(!ordered){
          resolve(res)
        } else {
          let otherRes = []
          for(let elem of strList){
            otherRes.push(
              res.find(prod => prod.id === elem)
            )
          }
          resolve(otherRes)
        }
      }).catch(err => reject(err))
    })
  }

  getProducts():Promise<Product[]>{
    return new Promise<Product[]>((resolve, reject) =>{
      this.db.queryFor('products').then(data => {
        let res:Product[] = []
        data.docs.forEach(doc => {
          res.push(doc.data() as Product)
        })
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  getProduct(id:string):Promise<Product>{
    return new Promise((resolve, reject)=>{
      this.db.get(`products/${id}`).then(data =>{
        resolve(data.data() as Product)
      }).catch(err => reject(err))
    })
  }

  getVideos():Promise<Video[]>{
    return new Promise<Video[]>((resolve, reject) => {
      this.db.queryFor('products', "video").then(data => {
        let res:Video[] = []
        data.docs.forEach(doc => {
          res.push(doc.data() as Video)
        })
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  getMusic():Promise<MusicTrack[]>{
    return new Promise<MusicTrack[]>((resolve, reject) => {
      this.db.queryFor('products', "music").then(data => {
        let res:MusicTrack[] = []
        data.docs.forEach(doc => {
          res.push(doc.data() as MusicTrack)
        })
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  getPlayListsFor(userId:string){
    return new Promise<Playlist[]>((resolve, reject) =>{
      this.db.queryFor(`users/${userId}/playlists`).then(data => {
        let result = []
        data.docs.forEach(doc => {
          result.push(doc.data() as Playlist)
        })
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
