import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {AdvertisementModel} from '../../../../models/Advertisement.model';
import {AdvertisementService} from '../../../../services/advertisement.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  AdvertisementForm: any;
  advertisementModel: AdvertisementModel = new AdvertisementModel();
  tzoffset = new Date().getTimezoneOffset() * 60000;
  localISOTime = new Date(Date.now() - this.tzoffset)
    .toISOString()
    .slice(0, -1);
  date = this.localISOTime.slice(0, 19).replace('T', ' ');
  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<EditDialogComponent>,
              private formBuilder: FormBuilder,
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
   this.AdvertisementForm.controls['Title'.toString()].setValue(this.data['arrayAdds'].title);
    this.AdvertisementForm.controls['Description'.toString()].setValue(this.data['arrayAdds'].description);
    this.AdvertisementForm.controls['Discount'.toString()].setValue(this.data['arrayAdds'].discount);
    this.AdvertisementForm.controls['UrlToImage'.toString()].setValue(this.data['arrayAdds'].urlToImage);
    this.AdvertisementForm.controls['Promotion'.toString()].setValue(this.data['arrayAdds'].promotion);
   console.log(this.data['arrayAdds'].id);
  }

  updateAvertisement(){
  this.advertisementModel.id = this.data['arrayAdds'].id;
  this.advertisementModel.userId = this.data['arrayAdds'].userId;
    this.advertisementModel.dateTime = this.date;
    this.advertisementModel.title = this.AdvertisementForm.value.Title;
    this.advertisementModel.description = this.AdvertisementForm.value.Description;
    this.advertisementModel.discount = this.AdvertisementForm.value.Discount;
    this.advertisementModel.urlToImage = this.AdvertisementForm.value.UrlToImage;
    this.advertisementModel.promotion = this.AdvertisementForm.value.Promotion;

    this.advertisementService.updateAdvertisementbyId(this.advertisementModel.id, this.advertisementModel).subscribe();
    alert('Advertisement updated');
  }
  onNoClick(){
    this.dialogRef.close();
  }

}
