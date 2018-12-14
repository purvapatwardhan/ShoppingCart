import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from './product/product.service';
import { ProductComponent } from './product/product.component';
import { Headers, Http, Request, Response, URLSearchParams, RequestMethod, RequestOptions, RequestOptionsArgs} from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-check-out',
  template: `
    <h1>
      Your bill is ready!
    </h1>
    <h3>Your Cart</h3>
  <table border="2">
  <tr>
    <th>Name</th>
    <th>Category</th>
    <th>Price</th>
    <th>Star Rating</th>
 </tr>

  <tr *ngFor="let product of cart">
        <td>{{product.name}}</td>
        <td>{{product.category}}</td>
        <td>{{product.price}}</td>
        <td>{{product.starRating}}</td>
        <td><input type="button" value="Remove"
        (click)="removeFromCart(product)"
   [class.selected]="product === selectedProduct"/></td>
  </tr>
  <tr> <td>Total :</td><td>{{total}}</td></tr>
</table>

Please fill the form below to checkout:
<table>
  <tr><td>Your Name         :</td><td><input type="text" id="uName"></td></tr>
  <tr><td>Address           :</td><td><input type="text" id="uAddr"></td></tr>
  <tr><td>Email ID          :</td><td><input type="text" id="uEmail"></td></tr>
</table>
<input type="button" (click)="sendBill()" value="CheckOut">
  `,
  styles: [],
  providers: [ProductComponent]
})
export class CheckOutComponent implements OnInit {

  cart : Product[] =[]; 
  total=0;
  name='';
  email='';
  address='';

  constructor(private productComp: ProductComponent , private http: HttpClient) { }

  ngOnInit() {
  this.cart=JSON.parse(sessionStorage.getItem("cart"));
  this.total=JSON.parse(sessionStorage.getItem("cartTotal"));
  }

  removeFromCart(selectedProduct: Product) {
  this.productComp.removeFromCart(selectedProduct);  
  }

  sendBill()
  {
      this.name=(<HTMLInputElement>document.getElementById('uName')).value;
      this.email=(<HTMLInputElement>document.getElementById('uEmail')).value;
      this.address=(<HTMLInputElement>document.getElementById('uAddr')).value;

      const ParseHeaders = {
      headers: new HttpHeaders({
       'Content-Type'  : 'application/x-www-form-urlencoded'
      })
     };

    var bodyParams ='email='+this.email+'&message='+this.composeMessage(this.name, this.address);

    this.storeOrderInDB();

    return this.http.post('http://localhost:3000/email/checkOut',bodyParams,ParseHeaders).subscribe((res)=>{console.log(res)});
  }

  storeOrderInDB(){
      const ParseHeaders = {
          headers: new HttpHeaders({
            'Content-Type'  : 'application/x-www-form-urlencoded'
         })
      };

      var bodyParams ='purchaseId='+sessionStorage.getItem("purchaseId")+
      '&user='+sessionStorage.getItem("user")+'&items='+JSON.stringify(this.cart)+'&total='+this.total;

      return this.http.post('http://localhost:3000/order',bodyParams,ParseHeaders).subscribe((res)=>{console.log(res)});
  }

  composeMessage(name, address)
  {
      let mailMessage = '';    
      const cart: Product[] = JSON.parse(sessionStorage.getItem('cart'));

      mailMessage += 'Dear ' + name + ',\n';
      mailMessage += 'Thank you for shopping with us!\n';

      mailMessage += 'Your Purchase ID is:\t'+sessionStorage.getItem("purchaseId");

      mailMessage += 'Your orders are as follow: \n\n';
      let total = 0;     
      
      for ( const product of cart)
      {       
        mailMessage += 'Product Name: ' + product.name + 
        ' Product Price: $' + product.price + '\n';
      }

      mailMessage += 'Total: ' + this.total + '\n';    
      mailMessage += 'We will send your orders to ' + address + ' as soon as possible.\n';
      mailMessage += 'Sincerely,\n';
      mailMessage += 'Shopping Cart Project';

      return mailMessage;  
  }
}
