import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { RegUserComponent } from './pages/reg-user/reg-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { AddContentComponent } from './pages/add-content/add-content.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { UpgradePlanComponent } from './pages/upgrade-plan/upgrade-plan.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'music', component: MainComponent},
  {path: 'videos', component: MainComponent},
  {path: 'register', component: RegUserComponent},
  {path: 'collection', component:CollectionComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'login', component:LoginComponent},
  {path: 'addContent', component:AddContentComponent},
  {path: 'viewContent/:id', component:ProductViewComponent},
  {path: 'upgrade', component: UpgradePlanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
