import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/user.model';
import {StorageService} from './storage.service';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'users/';
  public currentUser = this.storageService.getCurrentUser().id;
  constructor(private http: HttpClient, private storageService: StorageService) {

  }

  /*
  findAllUsers(): Observable<UserContainer> {
    return this.http.get<UserContainer>(this.basePath  + this.apiEndPoint);
  }*/
  getUser(){
    return this.http.get<User>(this.basePath + this.apiEndPoint)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getUserById(id: number = this.currentUser): Observable<User> {
    return this.http.get<User>(this.basePath + this.apiEndPoint + id.toString());
  }
  getUserByIdToForm(id: number = this.currentUser): Observable<User> {
    return this.http.get<User>(this.basePath + this.apiEndPoint + id.toString());
  }


  putUser(id: number, objUser: {}): Observable<User>{
    return this.http.put<User>(this.basePath + this.apiEndPoint + id.toString(), objUser );
  }
  patchUser(id: number, objUser: {}): Observable<User>{
    return this.http.patch<User>(this.basePath + this.apiEndPoint + id.toString(), objUser );
  }

  // tslint:disable-next-line:typedef
  getallUser()
  {
    return this.http.get<User>(this.basePath + this.apiEndPoint );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.basePath + this.apiEndPoint );
  }
}
