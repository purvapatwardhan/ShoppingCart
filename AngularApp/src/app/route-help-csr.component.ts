import { Component, OnInit } from '@angular/core';
import { Issue, RouteHelpCSRService } from './route-help-csr.service';

@Component({
  selector: 'app-route-help-csr',
  template: `You have following issues: <br><br>

  <table border="2">
  <tr>
    <th>Purchase ID</th>
    <th>Issue Category</th>
    <th>Issue</th>
    <th>Status</th>
    <th>Resolution</th>
    <th>Update</th>
  </tr>

  <tr *ngFor="let issue of issues" >
        <td>{{issue.purchaseId}}</td>
        <td>{{issue.category}}</td>
        <td>{{issue.description}}</td>
        
        <td><select #selectedOption id="element_status" value={{issue.status}}>
        	<option>Reading</option>
        	<option>Pending</option>
        	<option>Closed</option>
        </select>
        </td>
        
        <td><input type="text" value={{issue.resolution}} #resolution/></td>     

        <td><input type="button" value="Update Status"
            (click)="updateIssue(issue,selectedOption.value,resolution.value)"/>
        </td>
  </tr>
</table>
  `,
  styleUrls: ['./route-help-csr.component.css'],
  providers: [RouteHelpCSRService]
})
export class RouteHelpCSRComponent implements OnInit {

  resolution='';
  issues:any;

  constructor(private helpCsrService: RouteHelpCSRService) { }
  
  ngOnInit() {
  	this.helpCsrService.getIssues().subscribe(issues => (this.issues = issues));
  }

  updateIssue(issue,statusSelected,resolution){

  		issue.status=statusSelected;
      issue.resolution=resolution;
  		
      console.log("status : "+statusSelected);
      console.log("resolution : "+resolution);
  		
  		this.helpCsrService.updateIssue(issue);
  }
}