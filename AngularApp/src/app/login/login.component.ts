import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  template: `<div>

  User Name:<input type="text" [(ngModel)]="userName"><br/><br/>
  Password :<input type="password" [(ngModel)]="password"><br/><br/><br/>

  <button (click)="login()">Login</button>
  <button (click)="register()">Register</button>

  </div>`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	userName='';
	password='';
  registerFlag=false;
  	
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
  }

  register(){

      console.log("Login Successful");
      console.log("User : "+this.userName);
      console.log("Pwd : "+this.password);

      const ParseHeaders = {
        headers: new HttpHeaders({
            'Content-Type'  : 'application/x-www-form-urlencoded'
        })
    };

    var bodyParams ="user="+this.userName+"&password="+this.password;
    
    console.log(bodyParams);
      
    this.http.post("http://localhost:3000/login",bodyParams,ParseHeaders).subscribe((res)=>{console.log(res)}); 
  
  //this.registerFlag=true;
    }

  login(){

    var url='http://localhost:3000/login?user='+this.userName+'&password='+this.password;
    
    this.http.get(url).pipe(map(loginData => loginData)).subscribe((res)=>{this.validateLogin(res)} );
  }

   validateLogin(result:{}){
   		console.log(result);
      
   		switch(result)
   		{
   			case 0: alert("User Not Found"); break;
   			case 1: {
   						alert("Welcome to Shopping Cart Application"); 
   						sessionStorage.setItem("user",this.userName);

   						var min=100; 
    					var max=999;  
    					var purchaseId =(Math.floor(Math.random() * (+max - +min))+min).toString(); 
  						sessionStorage.setItem("purchaseId",purchaseId);
  						console.log("Purchase ID "+JSON.parse(sessionStorage.getItem("purchaseId")));

  						//navigate to products page
  						this.router.navigateByUrl('/products');

   						break;
   					}
   			case 2: alert("Please ckeck your password and try again!"); break;
   			default: alert("Error");
   		}
   }
}
