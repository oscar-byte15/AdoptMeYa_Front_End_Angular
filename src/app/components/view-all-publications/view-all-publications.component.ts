import { Component, OnInit } from '@angular/core';
import { PublishService } from '../../services/publish.service';
import { PetsService } from 'src/app/services/pets.service';
import { StorageService } from '../../services/storage.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AdoptionRequestService } from '../../services/adoption-request.service';
import { UserService } from '../../services/user.service';
import { DistrictService } from '../../services/district.service';
import { MatDialog } from '@angular/material/dialog';
import { AdoptionRequestDialogComponent } from '../adoptionRequest-dialog/adoption-request-dialog/adoption-request-dialog.component';
import {Router} from '@angular/router';
import { PublicationModel } from '../../models/publication.model';
import { Pet } from '../../models/pet.model';
import {FilterService} from '../../services/filter.service';
import { UserLocation } from '../../models/userLocation.model';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';


@Component({
  selector: 'app-view-all-publications',
  templateUrl: './view-all-publications.component.html',
  styleUrls: ['./view-all-publications.component.css'],
})
export class ViewAllPublicationsComponent implements OnInit {
  indice = 0;
  userName = '';
  userIdAt = 0;
  publicationId = 0;
  tzoffset = new Date().getTimezoneOffset() * 60000;
  localISOTime = new Date(Date.now() - this.tzoffset)
    .toISOString()
    .slice(0, -1);
  date = this.localISOTime.slice(0, 19).replace('T', ' ');
  public isEmpty = 1;
  public PublishForm: FormGroup;
  // to Form
  myControl = new FormControl();
  optionsDistrict: Location[];

  // to Filter
  publishCollection = [];
  petCollection: Pet[];
  publicationModelArray: PublicationModel[] = [];
  publicationTempArray: PublicationModel[] = [];
  publicationArray: PublicationModel[] = [];
  userCollection = [];
  districtCollection: Location[];
  UserLocationModelArray: UserLocation[] = [];
  UserLocationTempArray: UserLocation[] = [];
  arrayPublications: PublicationModel[] = [];

  constructor(
    private router: Router,
    public publishService: PublishService,
    public petService: PetsService,
    public storageService: StorageService,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public adoptionRequestService: AdoptionRequestService,
    public districtService: DistrictService,
    private dialog: MatDialog,
    public filterService: FilterService,
    public locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getPublicationCollection();
    this.getUserCollection();
    this.getLocationCollection();
    this.getPetCollection();
  }

  toFilter(kindanimal, gender, attention, district): void{
    if (district !== undefined || district !== ''){
      this.locationService.getLocationDistrict(district).subscribe(
        res => {
          this.districtCollection = res;
          console.log(this.districtCollection);
          console.log(this.arrayPublications);
          this.filterService.getPets(kindanimal, gender, attention).subscribe(
            result => {
              this.petCollection = result;
              this.publicationModelArray.length = 0;
              this.publicationTempArray.length = 0;
              this.UserLocationModelArray.length = 0;
              this.UserLocationTempArray.length = 0;
              this.publicationArray.length = 0;
              this.arrayPublications.length = 0;
              this.filterPetProps();
            }
          );
        }
      );
    }
    else{
      this.filterService.getPets(kindanimal, gender, attention).subscribe(
        result => {
          this.petCollection = result;
          this.publicationModelArray.length = 0;
          // this.publicationTempArray.length = 0;
          this.UserLocationModelArray.length = 0;
          // this.UserLocationTempArray.length = 0;
          this.publicationArray.length = 0;
          // this.arrayPublications.length = 0;
          this.getUserCollection();
          this.getLocationCollection();
          this.filterPetProps();
        }
      );
    }


  }

  filterPetProps(): void{

    for (const publish of this.publishCollection){
      for (const pet of this.petCollection){
        if (publish.id === pet.publicationId){
          this.publicationModelArray.push(new PublicationModel(
            publish.id, pet.id, publish.userId, pet.name, publish.comment, publish.datetime,
            pet.race, pet.attention, pet.age, pet.gender, 'sad'
          ));
          break;
        }
      }
      this.publicationTempArray = this.publicationModelArray;
    }

    for (const user of this.userCollection){
      for (const location of this.districtCollection){
        if (user.districtId === location.id){
          this.UserLocationModelArray.push(new UserLocation(
            user.id, location.id, location.district
          ));
          break;
        }
      }
      this.UserLocationTempArray = this.UserLocationModelArray;
    }
    console.log(this.publicationTempArray);
    console.log(this.UserLocationTempArray);

    for (const publish of this.publicationTempArray){
       for (const userLocation of this.UserLocationTempArray){
         if (publish.idUser === userLocation.idUser){
           this.publicationArray.push(new PublicationModel(
             publish.idPublication, publish.idPet, publish.idUser, publish.name, publish.comment, publish.datetime,
             publish.race, publish.attention, publish.age, publish.gender, userLocation.district
           ));
           break;
         }
       }
       this.arrayPublications = this.publicationArray;
     }

    }

  getPublicationCollection(): void{
    this.publishService.getPublications().subscribe(
      result => {
        this.publishCollection = result;
      }
    );
  }

  getUserCollection(): void{
    this.userService.getUsers().subscribe(
      result => {
        this.userCollection = result;
      }
    );
  }

  getLocationCollection(): void{
    this.locationService.getLocations().subscribe(
      result => {
        this.districtCollection = result;
        this.optionsDistrict = result;
      }
    );
  }

  getPetCollection(): void{
    this.petService.ReadPets().subscribe(
      result => {
        this.petCollection = result;
        this.filterPetProps();
      }
    );

  }

  onAdopt(userIdAt: number, publicationId: number): void {
    this.userService.getUserById(userIdAt).subscribe((result) => {
      this.userName = result.name;
      const dialogRef = this.dialog.open(AdoptionRequestDialogComponent, {
        width: '350px',
        data: {
          user_IdAt: userIdAt,
          publicationId_At: publicationId,
          userNameAt: this.userName,
        },
      });
    });
    this.userIdAt = userIdAt;
    this.publicationId = publicationId;
  }

  goToProfile(id): void{
    this.userService.currentUser = id;
    console.log(id);
    this.router.navigate(['profile']);
  }
}
