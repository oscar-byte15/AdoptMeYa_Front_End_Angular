import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"
import {AdoptionRequestModel} from '../models/AdoptionRequest.model';
import {Publication, Publish} from '../models/publish.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionRequestService {
  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'adoptionRequests';
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  postAdoptionRequest(data: any){
    return this.http.post<AdoptionRequestModel>(this.basePath + this.apiEndPoint, data);
  }

  getAdoptionRequest(){
    return this.http.get<AdoptionRequestModel>(this.basePath + this.apiEndPoint)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  // tslint:disable-next-line:max-line-length
  updateAdoptionRequest(b: boolean, id: number, uerIdFrom: number, useridAt: number, message: string, publicationId: number, date: string): Observable<AdoptionRequestModel>{
    return this.http.put<AdoptionRequestModel>('http://localhost:3000/adoptionRequests/' + id.toString(), {
      approved: b,
      uerIdFrom: uerIdFrom,
      useridAt: useridAt,
      message: message,
      publicationId: publicationId,
      date: date
    });
  }
  deleteAdoptionRequest(id: number): Observable<AdoptionRequestModel>
  {
    return this.http.delete<AdoptionRequestModel>('http://localhost:3000/adoptionRequests/' + id.toString());
  }

}
