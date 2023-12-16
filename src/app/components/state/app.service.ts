import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class AppService{
    baseUrl="http://localhost:5000/api/"

    constructor(private http:HttpClient) {}

    loadProfile(){
        return this.http.get(this.baseUrl+'profile',{
            withCredentials:true
        })
    }

    loadUsers(){
        return this.http.get(this.baseUrl+'admin/users',{
            withCredentials:true
        })
    }


}