import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from "../services/storage.service";

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router,
              private storageService: StorageService) { }

  canActivate() {
    if (this.storageService.getCurrentUser().type == "Client") {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['adds']);
    return false;
  }
}