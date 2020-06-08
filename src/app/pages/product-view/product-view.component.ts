import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Playlist } from 'src/app/models/playlist';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  product: Product = null;
  canView:boolean = false;
  ownsProduct:boolean = false;
  showPlayList:boolean = false;
  newPlayListName:string = '';
  selectedList:Playlist;
  playLists:Playlist[] = null;
  user:User = null;
  
  constructor(
    private router: Router,
    private productController: ProductService,
    private auth:AuthService
  ) { }


  ngOnInit() {
    let id = this.router.url.slice(this.router.url.lastIndexOf('/')+1)
    this.productController.getProduct(id).then( prod => {          
      this.product = prod
      if(this.auth.isLoggedIn()){
        this.user = this.auth.getUser()
        if (this.user.ownedProducts.includes(this.product.id)){
          this.canView = true
          this.ownsProduct = true
        } else if(this.user.subscription == prod.type){
          this.canView = true
        } else if (this.user.subscription == "premium"){
          this.canView = true
        } 
      }
    }).catch(err => console.log(err))
  }

  addToPlayList(){
    this.productController.getPlayListsFor(this.user.id).then(data =>{
      this.playLists = data
      this.showPlayList = true
    }).catch(err => {
      console.error(err)
    })
  }

  buyProduct(){
    this.productController.buyProductForUser(this.user, this.product).then(()=>{
      this.ownsProduct = true
      this.canView = true
      alert("Has comprado el producto, ahora puedes verlo incluso si terminas con tus suscripciones :D")
    })
  }

  confirmAddToPlayList(){
    if(this.selectedList != null){
      this.productController.addProductToPlaylist( this.user.id, this.product, this.selectedList).then(() => {
        this.showPlayList = false
        this.playLists = null      
        alert("Se añadió el elemento en la playlist!")
      })
    } else {
      alert("No se seleccionó ninguna lista")
    }
  }

  createPlaylist(){
    if(this.newPlayListName !== ''){
      this.productController.addNewPlayListWithProduct(this.user.id, this.product, this.newPlayListName).then(() => {
        alert("Ahora tienes una playlist nueva :D")
      })
    } else {
      alert("No se ha ingresado ningun nombre para la nueva lista")
    }
  }

  alertUpgrade(){
    alert("Para ver el video tienes que cambiar de plan o comprar el producto")
  }
}
