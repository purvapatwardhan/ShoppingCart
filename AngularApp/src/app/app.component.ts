import { Component } from '@angular/core';
import { Product } from './product/product.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `

  <div class="navbar">
  
  <div class="dropdown">
    <button class="dropbtn">User Functions 
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a [routerLink]="['/helpUser']" href="">Help & Support</a>
  		<a [routerLink]="['/products']" href="">Products</a>
      <a [routerLink]="['/order-history']" href="">Order History</a>
      <a [routerLink]="['/contact-us']" href="">Contact Us</a>
  		<a [routerLink]="['/check-out']" href="">Check-Out</a>
	</div>
  </div>

  <div class="dropdown">
    <button class="dropbtn">CSR Functions 
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
    	<a [routerLink]="['/helpCSR']" href="">Help & Support</a>
  		<a [routerLink]="['/orders']" href="">Orders</a>
	</div>
  </div> 

  <a href="#home">Logout</a>
</div>

<router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent {
}