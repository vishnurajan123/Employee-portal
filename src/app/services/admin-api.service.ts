import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAPIService {

  SERVER_URL="http://localhost:3000"

  constructor(private http:HttpClient) { }

  authenticate(){
    // api call - http://localhost:3000/users/1
    return this.http.get(`${this.SERVER_URL}/users/1`)
  }
  updateAdmin(admin:any){
    return this.http.put(`${this.SERVER_URL}/users/1`,admin)
  }
}
