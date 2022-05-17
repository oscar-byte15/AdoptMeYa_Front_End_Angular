import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';
import { map } from 'rxjs/operators';
import { Publication } from '../models/publish.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'pets';
  constructor(private http: HttpClient) { }

  CreatePet(type: string, name: string, attention: string, race: string, age: number, isAdopted: string, userId: number, publicationId: number, gender: string): Observable<Pet> {
    return this.http.post<Pet>(this.basePath + this.apiEndPoint, {
      type: type,
      name: name,
      attention: attention,
      race: race,
      age: age,
      isAdopted: isAdopted,
      userId: userId,
      publicationId: publicationId,
      gender: gender
    })
  }

  ReadPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.basePath + this.apiEndPoint);
  }
  ReadPetsByPublicationId(id: number): Observable<Pet> {
    return this.http.get<Pet>(this.basePath + this.apiEndPoint + "?publicationId=" + id.toString())
  }
  ReadPetsByUserId(id: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.basePath + this.apiEndPoint + "?userId=" + id.toString())
  }
  UpdatePetById(type: string, name: string, attention: string, race: string,
    age: number, isAdopted: string, userId: number, publicationId: number, id: number, gender: string): Observable<Publication> {
    return this.http.put<Publication>("http://localhost:3000/pets/" + id.toString(), {
      type: type,
      name: name,
      attention: attention,
      race: race,
      age: age,
      isAdopted: isAdopted,
      userId: userId,
      publicationId: publicationId,
      gender: gender
    })
  }
  DeletePet(id: number): Observable<Pet> {
    return this.http.delete<Pet>("http://localhost:3000/pets/" + id.toString());
  }
  filterPets(kindanimal:string,gender:string,require:string)
  {
    if (!kindanimal && !gender) {
      return this.http.get<Pet[]>(`http://localhost:3000/pets?attention=${require}`)
      .pipe(map((res: any)=>{
        return res;
      }))
    } else if (!require && !gender) {
      return this.http.get<Pet[]>(`http://localhost:3000/pets?type=${kindanimal}`)
      .pipe(map((res: any)=>{
        return res;
      }))
    } else if (!kindanimal && !require ) {
      return this.http.get<Pet[]>(`http://localhost:3000/pets?gender=${gender}`)
      .pipe(map((res: any)=>{
        return res;
      }))
    } else if (!kindanimal ) {
      return this.http.get<Pet[]>(`http://localhost:3000/pets?gender=${gender}&attention=${require}`)
      .pipe(map((res: any)=>{
        return res;
      }))
    } else if (!gender ) {
      return this.http.get<Pet[]>(`http://localhost:3000/pets?type=${kindanimal}&attention=${require}`)
      .pipe(map((res: any)=>{
        return res;
      }))
    } else if (!require ) {
      return this.http.get<Pet[]>(`http://localhost:3000/pets?type=${kindanimal}&gender=${gender}`)
      .pipe(map((res: any)=>{
        return res;
      }))
    } else if (
      !kindanimal &&
      !gender  &&
      !require
    ) {
      return this.http.get<Pet[]>(`http://localhost:3000/pets`)
      .pipe(map((res: any)=>{
        return res;
      }))
    } else {
      return this.http.get<Pet[]>(`http://localhost:3000/pets?type=${kindanimal}&gender=${gender}&attention=${require}`)
      .pipe(map((res: any)=>{
        return res;
      }))
    }



  }


}
