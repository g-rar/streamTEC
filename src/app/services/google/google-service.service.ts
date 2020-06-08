import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleServiceService {

  constructor(private http: HttpClient){

  }
  
  getIdFromUrl(url:string){
    let id:string = null; 
    if(url.match("v=")){
      id = url.slice(url.search('v=')+2)
      if(id.match('&')){
        id = id.slice(0,id.search('&'))
      }
    } else if(url.match('.be/')){
      id = url.slice(url.search('be/')+3)
      if(id.match('\\?')){
        id = id.slice(0,id.search('\\?'))
      }
    }
    return id;
    
  }

  getVideo(id:string):Promise<any>{
    return this.http.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${id}&key=AIzaSyAvUnA2LOmzinqIqMtG69mwQTAYmvY-scY`
      ).toPromise()
  }

}
