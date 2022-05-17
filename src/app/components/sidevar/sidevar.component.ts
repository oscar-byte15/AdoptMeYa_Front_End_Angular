import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.css']
})
export class SidevarComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
  }
  getRouter(): any{
    return this.router;
  }
  getUser(): any {
    return this.storageService.getCurrentUser();
  }
  seeAllPublicaions(): void{
    this.router.navigate(['publications']);
  }

  showSubscriptions(): void{
    this.router.navigate(['subscriptions']);
  }

  seeMyAllPublicaions(): void{
    this.router.navigate(['main']);
  }

  seeMyPerfil(): void{
    this.router.navigate(['profile']);
  }
  seeMyAdvertisements(): void{
  this.router.navigate(['adds']);
  }
  seeMyAdvertisementsWithPromotion(): void{
    this.router.navigate(['addsPromo']);
    }

  seeNotifications(): void{
    this.router.navigate(['notification']);
  }
}
