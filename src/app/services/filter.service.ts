import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publish} from '../models/publish.model';
import { Pet } from '../models/pet.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) { }

  getPublications(district): Observable<Publish[]> {
    return this.http.get<Publish[]>('http://localhost:3000/publications/');
  }
  getPets(kindanimal, gender, attention): Observable<Pet[]>{
    console.log(kindanimal, gender, attention);
    if (kindanimal !== undefined && gender !== undefined && attention !== undefined){
      return this.http.get<Pet[]>(`http://localhost:3000/pets?type=${kindanimal}&gender=${gender}&attention=${attention}`);
    }
    else if (kindanimal !== undefined && gender !== undefined){
      return this.http.get<Pet[]>(`http://localhost:3000/pets?type=${kindanimal}&gender=${gender}`);
    }
    else if (kindanimal !== undefined && attention !== undefined){
      return this.http.get<Pet[]>(`http://localhost:3000/pets?type=${kindanimal}&attention=${attention}`);
    }
    else if (gender !== undefined && attention !== undefined){
      return this.http.get<Pet[]>(`http://localhost:3000/pets?gender=${gender}&attention=${attention}`);
    }
    else if (kindanimal !== undefined ){
      return this.http.get<Pet[]>(`http://localhost:3000/pets?type=${kindanimal}`);
    }
    else if (gender !== undefined){
      return this.http.get<Pet[]>(`http://localhost:3000/pets?gender=${gender}`);
    }
    else if (attention !== undefined){
      return this.http.get<Pet[]>(`http://localhost:3000/pets?&attention=${attention}`);
    }
    else {
      return this.http.get<Pet[]>(`http://localhost:3000/pets`);
    }
  }
}
