import { Component, OnInit } from '@angular/core';
import { Issue, RouteHelpCSRService } from './route-help-csr.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-route-help',
  template: `
  	Purchase ID    : <input type='text' id='pId' #pId><br><br>
  	<input type="button" value="Search" (click)="searchIssue(pId.value)">
  	
  	<div *ngIf="(presentIssue!=null)">
    <br><br>
    <h4>Present Issue with this Purchase ID is as follows -</h4>
  	Issue status   : <input type='text' id='issueStatus' value={{presentIssue.status}}><br><br>
  	Resolution     : <input type='text' id='resolution' value={{presentIssue.resolution}}><br><br>
  	</div>
  	
  	
  	<div *ngIf="presentIssue==null && noIssue==true">
  	<br><br>
    <h4>Please enter details about your Issue -</h4>
  	Select a new query:<select id='new_issue' value='New Issue' #IssueType (change)=selectIssueType(IssueType.value)>
  						<option value="" disabled selected>Select your option</option>
  						<option value='PriceIssue'>Price Issue</option>
  						<option value='DeliveryIssue'>Delivery Issue</option>	
  						<option value='OtherIssue'>Other Issue</option>	
  				 	  </select>
  	<br><br>
  	<div *ngIf="PriceIssue" >
  	Price Issue: <select id='price_issue' value='Price Issue' [(ngModel)]="issueDesc">
  					<option value="" disabled selected>Select your option</option>
  					<option value='priceIssue1'>Price Issue 1</option>
  					<option value='priceIssue2'>Price Issue 2</option>	
  				 </select>
  	</div>
  	<div *ngIf="DeliveryIssue" >
  	Delivery Issue: <select id='delivery_issue' value='Delivery Issue' [(ngModel)]="issueDesc">
  					<option value="" disabled selected>Select your option</option>
  					<option value='deliveryIssue1'>Delivery Issue 1</option>
  					<option value='deliveryIssue2'>Delivery Issue 2</option>	
  			        </select>
  	</div>
  	<div *ngIf="OtherIssue" >
  	Other: <input type='text' id='other_issue' [(ngModel)]="issueDesc"><br><br>
  	</div>
	<br><br>
  	<input type="button" (click)=submitQuery(pId.value) value='Post Query'>
  	</div>
  `,
  styleUrls: ['./route-help.component.css'],
  providers: [RouteHelpCSRService]
})

export class RouteHelpComponent implements OnInit {

  noIssue: boolean=false;
  issues:any;

  issueDesc:string;
  issueCategory:string;
  PriceIssue:string=null;
  DeliveryIssue:string=null;
  OtherIssue:string=null;

  presentIssue:Issue;

  constructor(private helpCsrService: RouteHelpCSRService,private http: HttpClient) { }

  ngOnInit() {
  }

  selectIssueType(IssueType)
  {
  	switch(IssueType)
  	{
  		case 'PriceIssue':this.PriceIssue='thisIssue';
  						  this.issueCategory="price";
  						  this.DeliveryIssue=null;
  						  this.OtherIssue=null;
  			break;
  		case 'DeliveryIssue':this.DeliveryIssue='thisIssue';
  							 this.issueCategory="delivery";
  						     this.PriceIssue=null;
  						     this.OtherIssue=null;
  			break;
  		case 'OtherIssue':this.OtherIssue='thisIssue';
  						  this.issueCategory="other";
  			              this.DeliveryIssue=null;
  						  this.PriceIssue=null;
  			break;
  	}
  }

  searchIssue(purchaseId:number){
    var url='http://localhost:3000/issue/purchaseId?purchaseId='+purchaseId;
    
    this.http.get(url).pipe(map(IssueData => IssueData)).subscribe((res)=>{this.setPurchaseIdFlag(res)});
  }

  setPurchaseIdFlag(res){
    if(res==0){
        this.presentIssue=null;
        this.noIssue=true;
    }
    else{
        this.presentIssue=res[0];
    }
    console.log("In setPurchaseIdFlag with this.presentIssue : "+res);
  }
  
  submitQuery(purchaseId:number){
  	const ParseHeaders = {
        headers: new HttpHeaders({
            'Content-Type'  : 'application/x-www-form-urlencoded'
        })
    };

    var status="Reading";
    var resolution="New Issue";

    var bodyParams ="purchaseId="+purchaseId+"&category="+this.issueCategory+"&description="+this.issueDesc+"&status="+status+"&resolution="+resolution;
    
    console.log(bodyParams);
      
    this.http.post("http://localhost:3000/issue",bodyParams,ParseHeaders).subscribe((res)=>{console.log(res)}); 
  }
}