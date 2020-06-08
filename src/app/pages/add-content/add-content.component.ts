import { Component, OnInit } from '@angular/core';
import { GoogleServiceService } from 'src/app/services/google/google-service.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Video, MusicTrack, Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {

  contentURL: string = '';
  alertText:string = null;
  actualProduct: Product;
  //Para estos campos se ponen valores por defecto
  album: string = 'Solo';
  channelMode:"stereo"|"mono" = "mono";
  productPrice: number = 0;

  constructor(private productController: ProductService) { }

  ngOnInit() { 
  }

  lookForVideo(url: string, price: number) {
    this.resetProduct()
    this.productController.getVideoFromUrl(url, price).then((vid) => {
      this.alertText = null;
      this.actualProduct = vid;
    }).catch( err => {
      this.alertText = "Hubo un fallo con el video, compruebe la URL e intente de nuevo";
      console.error(err)
    });
  }

  lookForTrack(url: string, album:string, channelMode:"stereo"|"mono", price:number) {
    this.resetProduct()
    this.productController.getSongFromUrl(url, channelMode,album,price).then((vid) => {
      this.alertText = null;
      this.actualProduct = vid;
    }).catch( err => {
      this.alertText = "Hubo un fallo con el video, compruebe la URL e intente de nuevo";
      console.error(err)
    });
  }

  confirmProduct(){
    if(this.actualProduct != null){
      this.productController.addNewProduct(this.actualProduct).then(() => {
        this.resetProduct()
      })
    }
  }

  resetProduct(){
    this.alertText = null;
    this.actualProduct = null;
  }
}
