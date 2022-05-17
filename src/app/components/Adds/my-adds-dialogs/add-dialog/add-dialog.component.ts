import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {StorageService} from '../../../../services/storage.service';
import {AdvertisementModel} from '../../../../models/Advertisement.model';
import {AdvertisementService} from '../../../../services/advertisement.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  AdvertisementForm: any;
  advertisementModel: AdvertisementModel = new AdvertisementModel();
  tzoffset = new Date().getTimezoneOffset() * 60000;
  localISOTime = new Date(Date.now() - this.tzoffset)
    .toISOString()
    .slice(0, -1);
  date = this.localISOTime.slice(0, 19).replace('T', ' ');
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private advertisementService: AdvertisementService
  ) { }

  ngOnInit(): void {
    this.AdvertisementForm = this.formBuilder.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Discount: ['', Validators.required],
      UrlToImage: ['', Validators.required],
      Promotion: ['', Validators.required]
    });
  }
  onNoClick(){
    this.dialogRef.close();
  }
  getCurrentIdUser() {
    return this.storageService.getCurrentUser().id;
  }
  addAvertisement(){
   this.advertisementModel.userId = this.getCurrentIdUser();
   this.advertisementModel.dateTime = this.date;
   this.advertisementModel.title = this.AdvertisementForm.value.Title;
   this.advertisementModel.description = this.AdvertisementForm.value.Description;
   this.advertisementModel.discount = Number(this.AdvertisementForm.value.Discount);
   this.advertisementModel.urlToImage = this.AdvertisementForm.value.UrlToImage;
   this.advertisementModel.promotion = Boolean(this.AdvertisementForm.value.Promotion);
   this.advertisementService.postAdvertisement(this.advertisementModel).subscribe();
   alert('Advertisement Posted');
  }


}
