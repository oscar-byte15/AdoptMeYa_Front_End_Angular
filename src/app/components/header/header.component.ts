import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
  }
  onClick(): void {
    this.router.navigate(['signup']);
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
  getRouter(): any {
    return this.router;
  }
  logout(): void {
    this.storageService.logout();
  }
}
