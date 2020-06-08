import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {Icon} from '../../classes/icons';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  navElements = [
    {path: '/', icon: Icon.HOME, text: ''},
    {path: '/videos', icon: Icon.VIDEO,text:''},
    {path: '/music', icon: Icon.MUSIC,text:''},
  ]

  forLogged = {path: '/collection', icon: Icon.LIST,text:''}

  constructor(private auth:AuthService) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.navElements.push(this.forLogged)
    }
  }
}
