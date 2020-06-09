import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:User;

  constructor( private auth:AuthService, private router:Router) { }

  ngOnInit() {
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['/'])
    }
    this.user = this.auth.getUser()
  }

  logOut(){
    this.auth.logOut().then(() => {
      this.router.navigate(['/'])
      window.location.reload()
    })
  }

}
