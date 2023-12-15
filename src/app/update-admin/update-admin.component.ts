import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminAPIService } from '../services/admin-api.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
    editAdminStatus:boolean=false
    profileImage:string="./assets/images/icon-5359553_1280.webp"
    admindetails:any={}
   @Output() onAdminChage=new EventEmitter()

    constructor(private api:AdminAPIService){}
    ngOnInit(): void {
      // get admin details
      this.api.authenticate().subscribe((res:any)=>{
        this.admindetails=res
        if(res.picture){
          this.profileImage=res.picture
        }
        
      })
    }
    editAdminBtnClicked(){
      this.editAdminStatus=true
    }
    getFile(event:any){
      let file=event.target.files[0]
      let fr=new FileReader()
      fr.readAsDataURL(file)
      fr.onload=(event:any)=>{
        console.log(event.target.result);
        this.profileImage=event.target.result
        this.admindetails.picture=this.profileImage
        
      }

    }
    updateAdmin(){
      // console.log(this.admindetails);
      this.api.updateAdmin(this.admindetails).subscribe({
        next:(res:any)=>{
          alert("Admin details updated successfully ")
          // save admin details
          localStorage.setItem("admin_name",res.name)
          localStorage.setItem("admin_pswd",res.password)
          this.editAdminStatus=false
          this.onAdminChage.emit(res.name)
        },
        error:(err:any)=>{
          alert("Updation failed")
        }
      })
      
    }
    cancel(){
      this.editAdminStatus=false
    }
}
