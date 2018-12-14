import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactUsService } from './contact-us.service';
 
@Component({
  selector: 'app-contact-us',
  template: `
    <p>
    Please write your query/complaint in the box below,<br>
    We will try our best to get back to you with in 24hrs
    </p>

    Email ID : <input type="text" [(ngModel)]="userEmailId"/><br><br>
    Message  : <input type="text" [(ngModel)]="userMessage"/><br><br>
    <input type="button" id="sendMessage" value="Send Message" (click)="sendForm()"/>
  `,
  providers: [ContactUsService],
  styles: []
})
export class ContactUsComponent implements OnInit {

  userEmailId:string;
  userMessage:string;

  constructor(private contactUsService: ContactUsService) {}

  ngOnInit() {
  }

  sendForm(){
    this.contactUsService.postEmailQuery(this.userEmailId,this.userMessage);
  }
}
