import { Component, OnInit, Input } from '@angular/core';
import { Product, MusicTrack, Video } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product:Product;
  @Input() disabled:boolean = false;
  song:MusicTrack;
  video:Video;

  constructor(private router:Router) { }

  ngOnInit() {
    if(this.product.type === "music"){
      this.song = this.product as MusicTrack
    } else {
      this.video = this.product as Video
    }
  }

  viewProduct(){
    if(!this.disabled){
      this.router.navigate(['viewContent', this.product.id])
    }
  }

}
