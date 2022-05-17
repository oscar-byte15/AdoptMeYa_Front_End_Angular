import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publish, Publication } from '../models/publish.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublishService {
  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'publications';
  constructor(private http: HttpClient) { }

  createFormPublish(descripcion: string,
                    Name: string,
                    IsAtention: string,
                    Race: string,
                    Ubication: string,
                    Commnet: string,
                    Age: string,
                    IdUser: number,
                    Fecha: string

  ): Observable<Publish> {
    return this.http.post<Publish>(this.basePath + this.apiEndPoint , {
      descripcion,
      Name,
      IsAtention,
      Race,
      Ubication,
      Commnet,
      Age,
      IdUser,
      Fecha
    });
  }
  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.basePath + this.apiEndPoint);
  }
  listPublish(): Observable<Publish[]> {
    return this.http.get<Publish[]>(this.basePath + this.apiEndPoint);
  }
  listPublishByUserId(userId: number): Observable<Publish[]> {
    return this.http.get<Publish[]>(this.basePath + this.apiEndPoint + '?userId=' + userId.toString());
  }

  deletePublishById(id: number): Observable<Publish>
  {
    return this.http.delete<Publish>('http://localhost:3000/publications/' + id.toString());
  }
  getPublication(): Observable<Publish[]>{
    return this.http.get<Publish[]>('http://localhost:3000/publications')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updatePublishbyId(comment: string, datetime: string, userId: number , id: number): Observable<Publication>{
    return this.http.put<Publication>('http://localhost:3000/publications/' + id.toString(), {
      userId,
      comment,
      datetime
    });
  }
  patchPublish(id: number, petId) {
    return this.http.patch<Publication>('http://localhost:3000/publications/' + id.toString(), {petId: petId});
  }
  CreatePublish(comment: string, datetime: string, userId: number): Observable<Publication>{
    return this.http.post<Publication>(this.basePath + this.apiEndPoint, {
      comment,
      datetime,
      userId
    });
  }

}
