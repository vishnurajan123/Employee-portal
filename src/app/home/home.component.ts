import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../modules/users/userapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected: Date | null=new Date();
  showSidebar:boolean=true
  admin_name:string=""
  employeeCount:number=0

  constructor(private api:UserapiService,private router:Router){}
  ngOnInit(): void {
    if(localStorage.getItem("admin_name")){
       this.admin_name=localStorage.getItem("admin_name") || ""      
    }
    
  }

  menuBtnClick(){
    this.showSidebar=!this.showSidebar
  }
  getTotalEmployeeCount(){
    this.api.getAllUserAPI().subscribe((res:any)=>{
      this.employeeCount=res.length
    })
    
  }
  logout(){
    localStorage.removeItem("admin_name")
    localStorage.removeItem("admin_pswd")
    this.router.navigateByUrl("")
  }
  getUpdatedAdmin(event:any){
    this.admin_name=event

  }

}
