import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {Icon} from '../../classes/icons';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  isLogged = false;
  loggedIcon = Icon.USER;
  loginIcon = Icon.LOGIN

  navElements = [
    {path: '/', icon: Icon.HOME, text: 'Inicio'},
    {path: '/videos', icon: Icon.VIDEO,text:'Videos'},
    {path: '/music', icon: Icon.MUSIC,text:'Musica'},
  ]

  forLogged = {path: '/collection', icon: Icon.LIST,text:'Colección'}

  constructor(private auth:AuthService) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.isLogged = true
      this.navElements.push(this.forLogged)
    }
  }
}
