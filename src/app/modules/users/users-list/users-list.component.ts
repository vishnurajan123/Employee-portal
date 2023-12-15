import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserapiService } from '../userapi.service';
import { UserModel } from '../user.model';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
  p:number=1
  searchKey:string=""

  allUsers:UserModel[]=[]

  constructor(private router:Router, private api:UserapiService){}
  ngOnInit(): void {
    this.getallusers()
    
  }

  getallusers(){
    console.log("inside all users");
    this.api.getAllUserAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allUsers=res
        
      },error:(err:any)=>{
        alert(err.message)
      }
    })
    
  }

  removeUser(id:any){
    this.api.deleteUserAPI(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert("user removed successfully")
        this.getallusers()
        
      },
      error(err:any){
        alert(err.message)
      }
    })
  }

  sortById(){
    this.allUsers.sort((a:any,b:any)=>a.id-b.id)
  }
  sortByName(){
    this.allUsers.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  generatePdf(){
    let pdf=new jspdf()
    let head =[['Id','Name','Email','Status']]
    let body:any=[]
    this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.active])

    })
    pdf.setFontSize(16)
    pdf.text("All Users List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('alluserslist.pdf')
  }



  newUser(){
    this.router.navigateByUrl('/users/add')
  }


}
