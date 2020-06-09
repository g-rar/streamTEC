import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Playlist } from 'src/app/models/playlist';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  boughtProducts: Product[] = []
  playLists: Playlist[]
  productsInList: {name:string,products:Product[]}[] = []
  user: User

  constructor(private auth:AuthService, private productController:ProductService) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.user = this.auth.getUser()
      this.productController.getProductsInList(this.user.ownedProducts).then(data => {
        this.boughtProducts = data
      })
      this.productController.getPlayListsFor(this.user.id).then(data => {
        this.playLists = data
        for(let list of this.playLists){
          this.productController.getProductsInList(list.productIDs, true).then(pList => {
            this.productsInList.push({name: list.name, products: pList})
          }).catch(err => console.error(err))
        }
      })
    }
  }



}
