import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from './order.service';
import { Product, ProductService } from 'C:/Users/purva/Desktop/MEAN/ShoppingCart/AngularApp/src/app/product/product.service';

@Component({
  selector: 'app-order',
  template: `

<table>
  <tr>
    <th>User</th>
    <th>Purchase ID</th>
    <th>Total</th>
    <th>Items</th>
  </tr>

  <tr *ngFor="let order of orders" >
        <td>{{order.user}}</td>
        <td>{{order.purchaseId}}</td>
        <td>{{order.total}}</td>
        
        <td><input type="button" value="Items In Order"
            (click)="viewItems(order)"/>
        </td>
  </tr>
</table>


<br><br>
     <div *ngIf="selectedOrder">
      <h3>Items In Selected Order</h3>
      <h4>Purchase ID : {{selectedOrder.purchaseId}}</h4>
      <table>
      <tr>
      <th>Name</th>
      <th>Category</th>
      <th>Price</th>
      </tr>

      <tr *ngFor="let product of selectedOrderProducts">
        <td>{{product.name}}</td>
        <td>{{product.category}}</td>
        <td>{{product.price}}</td>
      </tr>
</table>

  `,
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  	orders: any;
  	selectedOrder:Order;
  	selectedOrderProducts : Product[] =[];

  	constructor(private orderService: OrderService) { }

  	ngOnInit() {
  		this.orderService.getOrders().subscribe(orders => (this.orders = orders));
  	}

  	viewItems(selectedOrder : Order){
  		this.selectedOrder = selectedOrder;
    	console.log("Order Items : "+this.selectedOrder);
    	
    	if (selectedOrder) {
    		this.selectedOrderProducts=JSON.parse(this.selectedOrder.items);
		}
  	}
}
