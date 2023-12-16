import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Profile } from '../models/allUsers';
import { Router } from '@angular/router';
import { userProfile } from '../state/app.selectors';
import { retrieveprofile } from '../state/app.actions';
import { Emitters } from '../../emitters/emitters';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  form!:FormGroup

  public name:any=""
  public email:any=""
  img:any=""
  selectedFile:any|File=null

  constructor(private http:HttpClient,private store:Store<{userdetails:Profile}>,private formBuilder:FormBuilder,private router:Router){}

  userData$=this.store.pipe(select(userProfile)).subscribe(userProfileData=>{
    this.name=userProfileData.name
    this.email=userProfileData.email
    this.img=userProfileData.image
  })

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/user',{
      withCredentials:true
    }).subscribe((res:any)=>{
      this.store.dispatch(retrieveprofile())
      Emitters.authEmitter.emit(true)
    },
    (err)=>{
      this.router.navigate(['/'])
      Emitters.authEmitter.emit(false)
    })
  }

  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0]
  }

  onSubmit(){
    const formData=new FormData()

    formData.append('image',this.selectedFile,this.selectedFile.name)
    this.http.post('http://localhost:5000/api/profile-upload-single',formData,{
      withCredentials:true
    }).subscribe((res:any)=>{
      Emitters.authEmitter.emit(true)
      this.store.dispatch(retrieveprofile())
      Swal.fire('Success','Saved','success')
    },(err)=>{
      Swal.fire("Error",err.error.message,'error')
    })
  }
}
