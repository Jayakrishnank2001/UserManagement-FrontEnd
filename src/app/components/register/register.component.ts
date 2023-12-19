import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  form!:FormGroup

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:"",
      email:"",
      password:""
    })
  }

  ValidateEmail=(email:any)=>{
    const validRegex= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRegex)){
      return true
    }else{
      return false
    }
  }

  submit():void{
    const user=this.form.getRawValue()
    if(user.name == "" || user.email == "" || user.password == ""){
      Swal.fire("Error","Please enter all the fields","error")
    }else if(!this.ValidateEmail(user.email)){
      Swal.fire("Error","Please enter a valid email","error")
    }else{
      this.http.post("http://localhost:5000/api/register",user,{
        withCredentials:true
      }).subscribe({
        next:()=>{
        this.router.navigate(['/'])
      },
      error:(err)=>{
        Swal.fire("Error",err.error.message,"error")
      }
    }
  )}
  }
}
