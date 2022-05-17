import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/AuthGuard';
import {MainTogglenavComponent } from './components/main-togglenav/main-togglenav.component';
import {HeaderComponent} from './components/header/header.component';
import {ViewAllPublicationsComponent } from './components/view-all-publications/view-all-publications.component';
import {SubscriptionsComponent} from './components/subscriptions/subscriptions.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
// tslint:disable-next-line:max-line-length
import {AdoptionRequestDialogComponent} from './components/adoptionRequest-dialog/adoption-request-dialog/adoption-request-dialog.component';
import {MyAddsComponent} from './components/Adds/my-adds/my-adds.component';
import {NotificationComponent} from './components/notification/notification.component';
import { AddsPromotionComponent } from './components/Adds/adds-promotion/adds-promotion.component';
import { UserGuard } from './guards/UserGuard';
import { VetGuard } from './guards/VetGuard';
import { SuppGuard } from './guards/SuppGuard';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  // si no hay usuario logeado, no se puede entrar a main
  {path: 'header', component: HeaderComponent, canActivate: [AuthGuard]},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'toggle', component: MainTogglenavComponent, canActivate: [AuthGuard]},
  {path: 'publications', component: ViewAllPublicationsComponent, canActivate: [AuthGuard]},
  {path: 'subscriptions', component: SubscriptionsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: 'adds', component: MyAddsComponent, canActivate: [AuthGuard]},
  {path: 'notification', component: NotificationComponent, canActivate: [AuthGuard]},
  {path: 'adoptionRequestDialog', component: AdoptionRequestDialogComponent, canActivate: [AuthGuard]},
  {path: 'addsPromo', component: AddsPromotionComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
