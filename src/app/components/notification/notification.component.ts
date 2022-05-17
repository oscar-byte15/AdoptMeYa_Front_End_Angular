import { Component, OnInit } from '@angular/core';
import {AdoptionRequestService} from '../../services/adoption-request.service';
import {StorageService} from '../../services/storage.service';
import {UserService} from '../../services/user.service';
import {PublishService} from '../../services/publish.service';
import {PetsService} from '../../services/pets.service';
import {Router} from '@angular/router';
import {Pet} from '../../models/pet.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
 public requests: [] = [];
 public users: [] = [];
  public publications: [] = [];
  public pets: Array<Pet>;
  uerIdFrom: 0;
  useridAt: 0;
  tzoffset = (new Date()).getTimezoneOffset() * 60000;
  localISOTime = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);
  date = this.localISOTime.slice(0, 19).replace('T', ' ');
  constructor(
    private adoptionService: AdoptionRequestService,
    private storageService: StorageService,
    private userService: UserService,
    private publishService: PublishService,
    private petService: PetsService,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.getRequests();
   this.getUsers();

   this.petService.ReadPets().subscribe((data) => {
     this.pets = data ;
     console.log("La info de request es: ",this.requests);
   });

  }
  // tslint:disable-next-line:typedef
  getUsers() {
    this.userService.getUser().subscribe((result) => {
      this.users = result;
    });
  }
  // tslint:disable-next-line:typedef
  getRequests() {
   this.adoptionService.getAdoptionRequest().subscribe((result) => {
     this.requests = result;
     this.uerIdFrom = result.uerIdFrom;
     this.useridAt = result.useridAt;
   });
  }

  // tslint:disable-next-line:typedef
  getCurrentIdUser() {
    return this.storageService.getCurrentUser().id;
  }
  // tslint:disable-next-line:typedef

  deleteRequest(id: number): void{
    this.adoptionService.deleteAdoptionRequest(id).subscribe(data => {
      alert('Publication deleted');
    });
    const index = id;
    this.requests.splice(index, 1);
  }

  // tslint:disable-next-line:typedef
  UpdateAdoptionRequest(id: number, uerIdFrom: number, useridAt: number, message: string, publicationId: number, b: boolean){
    this.adoptionService.updateAdoptionRequest(b, id, uerIdFrom, useridAt, message, publicationId, this.date).subscribe();
    alert('Adoption Request Sent to ' + id);
    this.getRequests();
  }
  goToPerfil(id: number): void{
    this.userService.currentUser = id;
    this.router.navigate(['profile']);
  }
}
