import { Component, OnInit } from '@angular/core';
import { GoogleServiceService } from '../../services/google/google-service.service';
import { AuthService } from '../../services/auth/auth.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  products:Product[];
  showRegister:boolean;
  constructor(private productsController:ProductService, private auth:AuthService, private router:Router) { }

  ngOnInit() {
    let url = this.router.url
    if(url.endsWith('/music')){
      this.productsController.getMusic().then(prods => {
        this.products = prods;
      })
    } else if(url.endsWith('/videos')){
      this.productsController.getVideos().then(prods => {
        this.products = prods;
      })
    } else {
      if(this.auth.isLoggedIn()){
        let subscription = this.auth.getUser().subscription
        if(subscription == 'music') {
          this.productsController.getMusic().then(products => {
            this.products = products
          }).catch(err => console.error(err))
        } else if(subscription == 'video') {
          this.productsController.getVideos().then(products => {
            this.products = products
          }).catch(err => console.error(err))
        } else {
          this.productsController.getProducts().then(products => {
            this.products = products
          }).catch(err => console.error(err))
        } 
      } else {
        this.showRegister = true;
      }
    }
  }
}
