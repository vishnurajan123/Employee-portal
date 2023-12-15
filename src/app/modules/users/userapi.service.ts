import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {
  SERVER_URL="http://localhost:3000"

  constructor(private http:HttpClient) { }

  // ad user api
  addUserAPI(user:UserModel){
    return this.http.post(`${this.SERVER_URL}/users`,user)
  }
  // get all user
  getAllUserAPI(){
    return this.http.get(`${this.SERVER_URL}/users`)
  }
  // delete user
  deleteUserAPI(id:string){
    return this.http.delete(`${this.SERVER_URL}/users/${id}`)
  }
  // view user
  viewUserAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/users/${id}`)
  }
  // update user api
  UpdateUserAPI(id:any,user:UserModel){
    return this.http.put(`${this.SERVER_URL}/users/${id}`,user)
  }
}
