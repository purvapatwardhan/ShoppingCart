import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RouteHelpCSRComponent } from './route-help-csr.component';
import { Headers, Http, Request, Response, URLSearchParams, RequestMethod, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';

export class Issue {
  _id:number;
  purchaseId:number;
  category:string;
  description:string;
  status:string;
  resolution:string;
}

@Injectable()
export class RouteHelpCSRService {

  constructor(private http: HttpClient) {}

  presentIssue:any;

  getIssues() {
    console.log("*******************getIssue****************");
    return this.http.get('http://localhost:3000/issue').pipe(map(issuesData => issuesData));
  }

  updateIssue(issue){
   	
   	const ParseHeaders = {
	    headers: new HttpHeaders({
       		'Content-Type'  : 'application/x-www-form-urlencoded'
    	})
    };

    var bodyParams ="issue="+JSON.stringify(issue);
    return this.http.put("http://localhost:3000/issue/"+issue._id,bodyParams,ParseHeaders).subscribe((res)=>{console.log(res)});
  }

}