import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  products:Product[];

  constructor(private productsController:ProductService) { }

  ngOnInit() {
    this.productsController.getVideos().then(prods => {
      this.products = prods;
    })
  }

}
