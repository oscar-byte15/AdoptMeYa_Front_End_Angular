import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdvertisementModel} from '../models/Advertisement.model';
import {Observable} from 'rxjs';
import {AdoptionRequestModel} from "../models/AdoptionRequest.model";
import {Pet} from "../models/pet.model";
import {Publication} from "../models/publish.model";




@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'advertisements';
  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  postAdvertisement(data: any): Observable<AdvertisementModel> {
    return this.http.post<AdvertisementModel>(this.basePath + this.apiEndPoint, data);
  }
  // tslint:disable-next-line:typedef
  listAdvertisementsByUserId(userId: number) {
    return this.http.get<any>('http://localhost:3000/advertisements?userId=' + userId.toString());
  }
  listAdvertisements(): Observable<AdvertisementModel[]> {
    return this.http.get<AdvertisementModel[]>(this.basePath + this.apiEndPoint);
  }
  deleteAdvertisement(id: number) {
    return this.http.delete<any>('http://localhost:3000/advertisements/' + id.toString());
  }
  updateAdvertisementbyId(id: number, data: any): Observable<Publication>{
    return this.http.put<Publication>("https://adopt-me-ya-backend.herokuapp.com/api/v1/advertisements/"+ id.toString(),data);
  }
}
