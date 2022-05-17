import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  seeAllPublicaions(): void{
    this.router.navigate(['publications']);
  }

  showSubscriptions(): void{
    this.router.navigate(['subscriptions']);
  }

  showMyPublications(): void{
    this.router.navigate(['main']);
  }


}

