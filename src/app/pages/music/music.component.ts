import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  
  products:Product[];

  constructor(private productsController:ProductService) { }

  ngOnInit() {
    this.productsController.getMusic().then(prods => {
      this.products = prods;
    })
  }
}
