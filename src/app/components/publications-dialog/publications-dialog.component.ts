import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Pet } from '../../models/pet.model';
import { StorageService} from '../../services/storage.service';
import { PublishService } from '../../services/publish.service';
import { PetsService } from '../../services/pets.service';
import { Publish, Publication } from '../../models/publish.model';
import { Validators, FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export interface DialogData {
  message: string;
}
export interface DialogData2 {
  message: string;
  arrPub: any;
  arrPets: any;
}
@Component({
  selector: 'app-publications-dialog',
  templateUrl: './publications-dialog.component.html',
  styleUrls: ['./publications-dialog.component.css']
})
export class PublicationsDialogComponent implements OnInit {
  public matcher1 = new MyErrorStateMatcher();
  public matcher2 = new MyErrorStateMatcher();
  public need_atention: any[] = ['Require', 'Dont require'];
  public type_pets: any[] = ['Dog', 'Cat', 'Parrot', 'Turtle', 'Rodents', 'Others']
  public list_gender: any[] = ['Male', 'Female']
  public user: User;
  // get current date
  tzoffset = (new Date()).getTimezoneOffset() * 60000;
  localISOTime = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);
  date = this.localISOTime.slice(0, 19).replace('T', ' ');
  public PublishForm: FormGroup;
  publishmodel: Publish = new Publish();
  update_publish : Publication = new Publication();
  update_pet : Pet = new Pet();
  public: Publication = new Publication();
  pet: Pet = new Pet();
  names = [];
  npets = [];
  public submitted: boolean;
  public listpublish: any;
  public listpets: any;
  constructor(private storageService: StorageService, private publishService: PublishService,
    private formBuilder: FormBuilder, private petService: PetsService,
    public dialogRef: MatDialogRef<PublicationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MAT_DIALOG_DATA) public data2: DialogData2) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.PublishForm = this.formBuilder.group({
      comment: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      attention: ['', Validators.required],
      race: [''],
      age: ['', [Validators.required, Validators.min(0), Validators.max(70)]],
      gender: ['', [Validators.required]]
    });
    if (this.data2['info'] == 'Edit') {
      this.update_publish.id = this.data2['arrPub'].id
      this.update_publish.userId = this.data2['arrPub'].userId;
      this.update_pet.id = this.data2['arrPets'].id
      this.update_pet.publicationId = this.data2['arrPets'].publicationId;
      this.update_pet.userId = this.data2['arrPets'].userId;
      this.PublishForm.controls['comment'.toString()].setValue(this.data2['arrPub'].comment)
      this.PublishForm.controls['type'.toString()].setValue(this.data2['arrPets'].type)
      this.PublishForm.controls['name'.toString()].setValue(this.data2['arrPets'].name)
      this.PublishForm.controls['attention'.toString()].setValue(this.data2['arrPets'].attention)
      this.PublishForm.controls['race'.toString()].setValue(this.data2['arrPets'].race)
      this.PublishForm.controls['age'.toString()].setValue(this.data2['arrPets'].age)
      this.PublishForm.controls['gender'.toString()].setValue(this.data2['arrPets'].gender)

    }
  }
  onSubmit(): void {
    this.submitted = true;
    console.log(this.PublishForm.value)
    if (this.PublishForm.valid) {
      alert("Publicacion creada")
      this.public.comment = this.PublishForm.value.comment;
      this.public.datetime = this.date;
      this.public.userId = this.storageService.getCurrentUser().id;
      this.publishService.CreatePublish(this.public.comment, this.public.datetime, this.public.userId).subscribe(
        data => this.correctPublication(data)
      );
    }
  }
  private correctPublication(data: Publication): void{
    this.pet.type = this.PublishForm.value.type
    this.pet.name = this.PublishForm.value.name
    this.pet.attention = this.PublishForm.value.attention
    this.pet.race = this.PublishForm.value.race;
    this.pet.age = this.PublishForm.value.age;
    this.pet.isAdopted = "No";
    this.pet.gender = this.PublishForm.value.gender;
    this.pet.userId = data.userId;
    this.pet.publicationId = data.id;
    this.petService.CreatePet(this.pet.type, this.pet.name, this.pet.attention,
      this.pet.race, this.pet.age, this.pet.isAdopted, this.pet.userId, this.pet.publicationId, this.pet.gender).subscribe(
        (data) => {
          console.log(data)
          this.publishService.patchPublish(this.pet.publicationId, data.id).subscribe()
        }
      );
  }

  updatePublication(): void {
    this.submitted = true;
    if (this.PublishForm.valid) {
      window.alert("Publicación actualizada")
      this.update_publish.comment = this.PublishForm.value.comment;
      this.update_publish.datetime = this.date;
      this.publishService.updatePublishbyId(this.update_publish.comment, this.update_publish.datetime, this.update_publish.userId, this.update_publish.id).subscribe(
        data => {
          this.petService.ReadPetsByPublicationId(data.id).subscribe(data =>{
            this.update_pet.age = this.PublishForm.value.age;
            this.update_pet.attention = this.PublishForm.value.attention;
            this.update_pet.isAdopted = this.PublishForm.value.isAdopted;
            this.update_pet.name = this.PublishForm.value.name;
            this.update_pet.race = this.PublishForm.value.race;
            this.update_pet.type = this.PublishForm.value.type;
            this.update_pet.gender = this.PublishForm.value.gender;
            this.petService.UpdatePetById(this.update_pet.type, this.update_pet.name, this.update_pet.attention, this.update_pet.race, this.update_pet.age,
              this.update_pet.isAdopted, this.update_pet.userId, this.update_pet.publicationId, this.update_pet.id, this.update_pet.gender).subscribe()
          })
        }
      );
      this.publishService.listPublishByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
        this.listpublish = data;
        this.names = this.listpublish;
        this.petService.ReadPetsByUserId(this.storageService.getCurrentUser().id).subscribe((data) => {
          this.listpets = data;
          this.npets = this.listpets;
        });
      });
    }
  }
}
