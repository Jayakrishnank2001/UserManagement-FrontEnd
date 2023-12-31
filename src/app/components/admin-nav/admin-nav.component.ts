import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Emitters } from '../../emitters/emitters';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent implements OnInit{

  authenticated=true

  constructor(private http:HttpClient) {}

  ngOnInit():void{
    Emitters.authEmitter.subscribe((auth:boolean)=>{
      this.authenticated=auth
    })
  }

  logout():void{
    this.http.post('http://localhost:5000/api/logout',{},{
      withCredentials:true
    }).subscribe(()=>this.authenticated=false)
  }

}
