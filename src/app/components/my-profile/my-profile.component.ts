import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from '../../services/user.service';
import {StorageService} from '../../services/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {LocationService} from '../../services/location.service';
import { User } from '../../models/user.model';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy{
  infUser: any;
  district: any;
  location: any;
  // tslint:disable-next-line:max-line-length
  constructor(public locationService: LocationService, public dialog: MatDialog, public userService: UserService, public storageService: StorageService){}

  ngOnInit(): void {
    this.getInfoCurrentUser();
  }
  ngOnDestroy(): void{
    this.userService.currentUser = this.storageService.getCurrentUser().id;
  }


  public getInfoCurrentUser(): void{

    // console.log(this.auxInfUser);
    this.userService.getUserById(this.userService.currentUser).subscribe(
      data => {
        this.infUser = data;
        this.locationService.getLocation(this.infUser.districtId).subscribe(
          res => {
            this.location = res.district;
          });
      });
  }
  editForm(): void{
    this.dialog.open(FormUserDialogComponent);
  }


}


@Component({
  selector: 'app-dialog-elements-example-dialog',
  template: `
    <div style="display: flex; flex-wrap: wrap; gap:20px; width: 430px">
      <mat-form-field appearance="standard">
        <mat-label>email</mat-label>
        <input  matInput #email maxlength="20"  [value]="infUser.email" >
        <mat-hint align="end">{{email.value?.length || 0}}/20</mat-hint>
        <mat-hint  *ngIf='email.value.length === 0 ' style="color:red">You Must enter a value</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="standard">
        <mat-label>password</mat-label>
        <input  matInput #password maxlength="30"  [value]="infUser.password">
        <mat-hint align="end">{{password.value?.length || 0}}/20</mat-hint>
        <mat-hint  *ngIf='password.value.length === 0 ' style="color:red">You Must enter a value</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="standard">
        <mat-label>type</mat-label>
        <input  matInput #type maxlength="20"  [value]="infUser.type">
        <mat-hint align="end">{{type.value?.length || 0}}/20</mat-hint>
        <mat-hint  *ngIf='type.value.length === 0 ' style="color:red">You Must enter a value</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="standard">
        <mat-label>user</mat-label>
        <input  matInput #user maxlength="20"  [value]="infUser.user">
        <mat-hint align="end">{{user.value?.length || 0}}/20</mat-hint>
        <mat-hint  *ngIf='user.value.length === 0 ' style="color:red">You Must enter a value</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="standard">
        <mat-label>ruc</mat-label>
        <input  matInput #ruc maxlength="11"  [value]="infUser.ruc">
        <mat-hint align="end">{{ruc.value?.length || 0}}/11</mat-hint>
        <mat-hint  *ngIf='ruc.value.length === 0 ' style="color:red">You Must enter a value</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="standard">
        <mat-label>dni</mat-label>
        <input  matInput #dni maxlength="8"  [value]="infUser.dni">
        <mat-hint align="end">{{dni.value?.length || 0}}/8</mat-hint>
        <mat-hint  *ngIf='dni.value.length === 0 ' style="color:red">You Must enter a value</mat-hint>
      </mat-form-field>
      <mat-form-field  appearance="standard">
        <mat-label>phone</mat-label>
        <input  matInput #phone maxlength="9"  [value]="infUser.phone">
        <mat-hint align="end">{{phone.value?.length || 0}}/9</mat-hint>
        <mat-hint  *ngIf='phone.value.length === 0 ' style="color:red">You Must enter a value</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="standard">
        <mat-label>name</mat-label>
        <input  matInput #name maxlength="20"  [value]="infUser.name">
        <mat-hint align="end">{{name.value?.length || 0}}/20</mat-hint>
        <mat-hint  *ngIf='name.value.length === 0 ' style="color:red">You Must enter a value</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="standard">
        <mat-label>last Name</mat-label>
        <input  matInput #lastname maxlength="20"  [value]="infUser.lastname">
        <mat-hint align="end">{{lastname.value?.length || 0}}/20</mat-hint>
        <mat-hint  *ngIf='lastname.value.length === 0 ' style="color:red">You Must enter a value</mat-hint>
      </mat-form-field>
      <mat-form-field appearance="standard">
        <mat-label>District</mat-label>
        <input  matInput #districtId maxlength="20"  [value]="location">
        <mat-hint align="end">{{districtId.value?.length || 0}}/20</mat-hint>
        <mat-hint  *ngIf='districtId.value.length === 0 ' style="color:red">You Must enter a value</mat-hint>
      </mat-form-field>
      <mat-card-actions>
        <button mat-button
                (click)="save(email.value, password.value, type.value, user.value, ruc.value, dni.value, phone.value, name.value, lastname.value, districtId.value)">SAVE</button>
        <button mat-button  (click)="cancel()">CANCEL</button>
      </mat-card-actions>
    </div>
  `
})

export class FormUserDialogComponent implements OnInit {
  infUser: any;
  location: any;

  constructor(public dialog: MatDialog, private userService: UserService, private storageService: StorageService,
              private locationService: LocationService){}

  ngOnInit(): void {
    this.getInfoCurrentUser();
  }

  getInfoCurrentUser(): void{


    this.userService.getUserByIdToForm(this.userService.currentUser).subscribe(
      res => {
        this.infUser = res;
        this.locationService.getLocationToForm(this.infUser.districtId).subscribe(
          data => {
            this.location = data.district;
          });
      });
  }
  save(email, password, type, user, ruc, dni, phone, name, lastname, districtId): void{

    console.log(districtId);
    let locationId: any = 0;
    switch (districtId) {
      case 'Ventanilla':
        locationId = 0;
        break;
      case 'Barranco':
        locationId = 1;
        break;
      case 'Miraflores':
        locationId = 2;
        break;
      case 'Surquillo':
        locationId = 3;
        break;
      case 'San Isidro':
        locationId = 4;
        break;
      case 'Callao':
        locationId = 5;
        break;
      case 'Chorrillos':
        locationId = 6;
        break;
      case 'Comas':
        locationId = 7;
        break;
      case 'Jesus Maria':
        locationId = 8;
        break;
      case 'La Molina':
        locationId = 9;
        break;
      case 'La Victoria':
        locationId = 10;
        break;
      case 'Lima':
        locationId = 11;
        break;
      case 'Lince':
        locationId = 12;
        break;
      case 'Los Olivos':
        locationId = 13;
        break;
      case 'Lurin':
        locationId = 14;
        break;
      case 'Puenta Piedra':
        locationId = 15;
        break;
      case 'Rimac':
        locationId = 16;
        break;
      case 'Santiago de Surco':
        locationId = 17;
        break;
      case 'San Borja':
        locationId = 18;
        break;
      case 'San Isidro':
        locationId = 19;
        break;
      case 'San Juan de Lurigancho':
        locationId = 20;
        break;
      case 'San Juan de Miraflores':
        locationId = 21;
        break;
      case 'San Martin de Porres':
        locationId = 22;
        break;
      case 'San Isidro':
        locationId = 23;
        break;
      case 'Ventanilla':
        locationId = 24;
        break;
      case 'Villa El Salvador':
        locationId = 25;
        break;
      default:
        break;
    }
    districtId = locationId;


    if (email === '' || type === '' || user === '' || dni === '' || ruc === '' || phone === ''
    || name === '' || lastname === '' || districtId === ''){
     return;
    }
    this.userService.patchUser(this.storageService.getCurrentUser().id,
      {email, type, user, ruc, dni, phone, name, lastname, districtId}).subscribe(
  );
    location.reload();
    this.dialog.closeAll();
  }

  cancel(): void{
    this.dialog.closeAll();
  }
}
