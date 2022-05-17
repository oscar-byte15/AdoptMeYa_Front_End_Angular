import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Session, SessionContainer }from "../models/session.model";
import { User } from "../models/user.model";
import { distinctUntilChanged } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private basePath: string = "http://localhost:3000/"
  apiEndPoint: string = "users/";
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Session> {
    return this.http.post<Session>(this.basePath + 'login', {email: email, password: password})
  }
  signup(name: string, lastname: string, email: string, password: string, type: string, user: string, ruc: string, dni: string, phone: string, districtId: number): Observable<Session> {
    return this.http.post<Session>(this.basePath + 'signup', {
      name: name, lastname: lastname, email: email, password: password, type: type, user: user, ruc: ruc, dni: dni, phone: phone, districtId: districtId
    })
  }

  /*
  signup(username: string, password: string, rol: string, email: string, petSupplierLocation: string, dni: string, ruc: string, phone: string): Observable<SessionContainer> {
    return this.http.post<SessionContainer>(this.basePath + 'signup', {username: username, password: password, email: email, rol: rol, petSupplierLocation: petSupplierLocation, dni: dni, ruc: ruc, phone: phone})
  }
  */
}
