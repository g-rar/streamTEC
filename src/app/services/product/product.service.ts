import { Injectable } from '@angular/core';
import { ProductBuilder } from 'src/app/classes/productBuilder';
import { ProductFactory } from 'src/app/classes/productFactory';
import { GoogleServiceService } from '../google/google-service.service';
import { Video, Product, MusicTrack } from 'src/app/models/product';
import { FirestoreService } from '../firestore/firestore.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private builder:ProductBuilder = new ProductBuilder();
  private factory:ProductFactory = new ProductFactory();

  constructor(private yt: GoogleServiceService, private db:FirestoreService) { }

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

  getProducts():Promise<Product[]>{
    return new Promise<Product[]>((resolve, reject) =>{
      this.db.get('products').then(data => {
        let res:Product[] = []
        data.docs.forEach(doc => {
          res.push(doc.data() as Product)
        })
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  getVideos():Promise<Video[]>{
    return new Promise<Video[]>((resolve, reject) => {
      this.db.get('products', "video").then(data => {
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
      this.db.get('products', "music").then(data => {
        let res:MusicTrack[] = []
        data.docs.forEach(doc => {
          res.push(doc.data() as MusicTrack)
        })
        resolve(res)
      }).catch(err => reject(err))
    })
  }
}
