import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppService } from '../state/app.service'
import { uniqueEmail } from '../state/app.selectors'
import { Users } from '../models/allUsers';
import { Router } from '@angular/router';
import { retrievepost } from '../state/app.actions'
import { Emitters } from '../../emitters/emitters'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrl: './admin-userlist.component.css'
})

export class AdminUserlistComponent implements OnInit{

  filteredUsers:Users[]=[]
  users!:Users[]
  searchText!:string

  constructor(private http:HttpClient,private store:Store<{allusers:Users[]}>,private router:Router,private appService:AppService){}

  userdata$=this.store.pipe(select(uniqueEmail))

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/admin/active',{
      withCredentials:true
    }).subscribe({
      next:(res:any)=>{
      this.store.dispatch(retrievepost())
      Emitters.authEmitter.emit(true)
    },
    error:(err)=>{
      this.router.navigate(['/admin'])
      Emitters.authEmitter.emit(false)
  }})
  }

  deleteUser(userId:any){

    Swal.fire({
      title:'Are you sure?',
      text:'Do you want to delete this user?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Yes, delete it!',
      cancelButtonText:'No, cancel!'
    }).then((result)=>{
      if(result.isConfirmed){
      this.http.post(`http://localhost:5000/api/admin/deleteUser/${userId}`,{},{
      withCredentials:true
    }).subscribe({
      next:(res:any)=>{
      this.store.dispatch(retrievepost())
      Swal.fire("Success","User Deleted Successfully","success")
      Emitters.authEmitter.emit(true)
    },
    error:(err)=>{
      this.router.navigate(['/admin'])
      Emitters.authEmitter.emit(false)
    }})
    Swal.fire(
      'Deleted!',
      'User has been deleted.',
      'success'
    )
    }
    })
  }

  editUser(userId:any){
    this.router.navigate(['/admin/edit',userId])
  }

  search():void{
    if(!this.searchText){
      this.filteredUsers=[...this.users] 
    }

    this.filteredUsers=this.users.filter((user)=>
      user.name.toLowerCase().includes(this.searchText.toLowerCase())
    )
  }

  showSearchResult():void{
    this.search()
  }

}
