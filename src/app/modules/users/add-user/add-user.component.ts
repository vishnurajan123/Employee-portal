import { Component } from '@angular/core';
import { UserModel } from '../user.model';
import { UserapiService } from '../userapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user:UserModel={}

  constructor(private api:UserapiService,private router:Router){}



  addUser(){
    this.api.addUserAPI(this.user).subscribe({
      next:(res:UserModel)=>{
        console.log(res);
        alert("User user added successfully")
        this.router.navigateByUrl('/users')
        
      },
      error:(err:any)=>{
        alert(err.message)
      }
    })


  }
  cancel(){
    this.user={}
  }

}
