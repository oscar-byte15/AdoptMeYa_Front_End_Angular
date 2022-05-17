import { Component, OnInit } from '@angular/core';
import {AdvertisementService} from '../../../services/advertisement.service';
import {StorageService} from '../../../services/storage.service';

@Component({
  selector: 'app-adds-promotion',
  templateUrl: './adds-promotion.component.html',
  styleUrls: ['./adds-promotion.component.css']
})
export class AddsPromotionComponent implements OnInit {
  public Adds: any;
  constructor(private advertisementService: AdvertisementService,
    public storageService: StorageService) { }

  ngOnInit(): void {
    this.advertisementService.listAdvertisements().subscribe((data) => {
      // tslint:disable-next-line:forin
        for (const i in data){
        this.Adds = data;
        console.log(this.Adds);
      }
    });

  }

}
