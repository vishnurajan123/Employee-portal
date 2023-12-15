import { Component } from '@angular/core';
import { AdminAPIService } from '../services/admin-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email:string=""
password:string=""

constructor(private api:AdminAPIService, private router:Router){}

login(){
  if(!this.email || !this.password){
    alert("Please fill the form completely")

  }
  else{
    this.api.authenticate().subscribe({
      next:(res:any)=>{
        console.log(res);
        const {email,password}=res
        if(email===this.email && password===this.password){
          // save admin details
          localStorage.setItem("admin_name",res.name)
          localStorage.setItem("admin_pswd",res.password)

          alert("Login successfully ...")
          // navigate to dashboard
          this.router.navigateByUrl('/dashboard')
          
        }
        else{
          alert("Invalid usernma eo rpassword")
        }
        
      },
      error:(res:any)=>{
        alert(res.message)
      }
    })
  }
}

}
