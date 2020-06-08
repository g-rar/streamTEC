import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { MusicComponent } from './pages/music/music.component';
import { VideosComponent } from './pages/videos/videos.component';
import { RegUserComponent } from './pages/reg-user/reg-user.component';
import { OwnedComponent } from './pages/owned/owned.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { AddContentComponent } from './pages/add-content/add-content.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'music', component: MusicComponent},
  {path: 'videos', component: VideosComponent},
  {path: 'register', component: RegUserComponent},
  {path: 'owned', component:OwnedComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'login', component:LoginComponent},
  {path: 'addContent', component:AddContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
