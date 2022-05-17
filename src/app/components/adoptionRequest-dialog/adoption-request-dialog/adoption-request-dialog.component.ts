import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {AdoptionRequestModel} from '../../../models/AdoptionRequest.model';
import {StorageService} from '../../../services/storage.service';

import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdoptionRequestService} from '../../../services/adoption-request.service';
@Component({
  selector: 'app-adoption-request-dialog',
  templateUrl: './adoption-request-dialog.component.html',
  styleUrls: ['./adoption-request-dialog.component.css']
})
export class AdoptionRequestDialogComponent implements OnInit {
  public PublishForm: FormGroup;
  adoptionRequest: AdoptionRequestModel = new AdoptionRequestModel();
  tzoffset = (new Date()).getTimezoneOffset() * 60000;
  localISOTime = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);
  date = this.localISOTime.slice(0, 19).replace('T', ' ');
  constructor(private formBuilder: FormBuilder, private storageService: StorageService,
              @Inject(MAT_DIALOG_DATA) public data,  private adoptionRequestService: AdoptionRequestService,
              public dialogRef: MatDialogRef<AdoptionRequestDialogComponent>) { }

  ngOnInit(): void {
    this.PublishForm = this.formBuilder.group({
      message: ['', Validators.required],
    });
    console.log(this.data);
  }
  getCurrentIdUser(){
    return this.storageService.getCurrentUser().id;
  }
  sendAdoptionRequest(){
    var useridAt = Number(this.data.userId_At);
    var publicationIdAt = Number(this.data.publicationId_At);
    if (this.PublishForm.value.message !== ''){
      this.adoptionRequest.uerIdFrom = this.getCurrentIdUser();
      this.adoptionRequest.useridAt = useridAt;
      this.adoptionRequest.message = this.PublishForm.value.message;
      this.adoptionRequest.publicationId = publicationIdAt;
      this.adoptionRequest.date = this.date;
      this.adoptionRequest.approved = false;
      this.adoptionRequestService.postAdoptionRequest(this.adoptionRequest).subscribe();
      alert('Adoption Request Sent to ' + this.data.userNameAt);
    }

  }

  onNoClick(){
    this.dialogRef.close();
  }

}
