import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  private basepath: string = 'http://localhost:3000/';
  apiEndpoint: string = 'districts';
  constructor(private http: HttpClient) {}

  getAllDistricts() {
    return this.http.get(this.basepath + this.apiEndpoint);
  }
  getDistrictByName(data)
  {
    return this.http.get(this.basepath + this.apiEndpoint +`?district=${data}`)
    .pipe(map((res: any)=>{
      return res;
    }));  
  }


}
