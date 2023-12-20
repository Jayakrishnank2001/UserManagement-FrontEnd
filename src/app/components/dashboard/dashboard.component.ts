import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emitters/emitters';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/admin/active',{
      withCredentials:true
    }).subscribe({
      next:(res:any)=>{
      Emitters.authEmitter.emit(true)
    },
    error:(err)=>{
      Emitters.authEmitter.emit(false)
    }})
  }
}
