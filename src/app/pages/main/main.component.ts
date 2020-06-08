import { Component, OnInit } from '@angular/core';
import { GoogleServiceService } from '../../services/google/google-service.service';
import { AuthService } from '../../services/auth/auth.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  products:Product[];
  constructor(private productsController:ProductService, private auth:AuthService) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      console.log("User logged");
      if(this.auth.getUser().subscription == "demand"){
        this.productsController.getProducts().then(products => {
          this.products = products
        }).catch(err => console.error(err))
      }
    }
  }
}
