import { Injectable } from '@angular/core';
import { Headers, Http, Request, Response, URLSearchParams, RequestMethod, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ContactUsService {
	
	constructor(private http: HttpClient) {}

	postEmailQuery(userEmailId:string , userMessage:string) {

      const ParseHeaders = {
      headers: new HttpHeaders({
       'Content-Type'  : 'application/x-www-form-urlencoded'
      })
     };

	var bodyParams ='email='+userEmailId+'&message='+userMessage;

    return this.http.post('http://localhost:3000/email/contactUs',bodyParams,ParseHeaders).subscribe((res)=>{console.log(res)});
    }
}