import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upgrade-plan',
  templateUrl: './upgrade-plan.component.html',
  styleUrls: ['./upgrade-plan.component.scss']
})
export class UpgradePlanComponent implements OnInit {

  musicPrice:number = 1500;
  videoPrice:number = 2000;
  premiumPrice:number = 2500;
  subType:"demand"|"music"|"video"|"premium";

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['/'])
    }
    this.subType = this.auth.getUser().subscription
    if(this.auth.isBirthMonth()){
      console.log("mes de cumplea;os");
      
      this.musicPrice = this.musicPrice * 0.95
      this.videoPrice = this.videoPrice * 0.95
      this.premiumPrice = this.premiumPrice * 0.95
    }
  }

  changePlan(){
    this.auth.changePlan(this.subType).then(() => {
      this.router.navigate(['/'])
    })
  }

}
