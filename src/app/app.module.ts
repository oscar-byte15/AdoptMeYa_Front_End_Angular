import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Reactive Forms
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// Http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// angular materail
import { MaterialModule } from './material.module';
// components
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';
// services
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { AdoptionRequestService } from './services/adoption-request.service';
import { AdvertisementService } from './services/advertisement.service';
import { DistrictService } from './services/district.service';
import { PetsService } from './services/pets.service';
// guards
import { AuthGuard } from './guards/AuthGuard';
import { UserGuard } from './guards/UserGuard';
import { VetGuard } from './guards/VetGuard';
import { SuppGuard } from './guards/SuppGuard';
// interceptor
import { AuthInterceptor } from './interceptor/AuthInterceptor';
import {PublishService} from './services/publish.service';
import { MainTogglenavComponent } from './components/main-togglenav/main-togglenav.component';
import { ViewAllPublicationsComponent } from './components/view-all-publications/view-all-publications.component';
import { SubscriptionsComponent} from './components/subscriptions/subscriptions.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SidevarComponent } from './components/sidevar/sidevar.component';
import { MyProfileComponent, FormUserDialogComponent } from './components/my-profile/my-profile.component';
import { PublicationsDialogComponent } from './components/publications-dialog/publications-dialog.component';
import { AdoptionRequestDialogComponent } from './components/adoptionRequest-dialog/adoption-request-dialog/adoption-request-dialog.component';
import { MyAddsComponent } from './components/Adds/my-adds/my-adds.component';
import { AddDialogComponent } from './components/Adds/my-adds-dialogs/add-dialog/add-dialog.component';
import { EditDialogComponent } from './components/Adds/my-adds-dialogs/edit-dialog/edit-dialog.component';
import {NotificationComponent} from './components/notification/notification.component';
import { AddsPromotionComponent } from './components/Adds/adds-promotion/adds-promotion.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    SignupComponent,
    MainTogglenavComponent,
    ViewAllPublicationsComponent,
    SubscriptionsComponent,
    SidevarComponent,
    MyProfileComponent,
    FormUserDialogComponent,
    PublicationsDialogComponent,
    MyAddsComponent,
    AddDialogComponent,
    EditDialogComponent,
    NotificationComponent,
    AdoptionRequestDialogComponent,
    MyAddsComponent,
    AddDialogComponent,
    EditDialogComponent,
    AddsPromotionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    AuthService, StorageService, AuthGuard, UserService, PublishService, AdoptionRequestService,
    AdvertisementService, DistrictService, PetsService, UserGuard, VetGuard, SuppGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
