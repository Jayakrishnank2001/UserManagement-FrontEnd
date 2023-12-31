import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/user',{
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
