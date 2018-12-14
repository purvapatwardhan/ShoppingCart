import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from './order/order.service';
import { Product, ProductService } from './product/product.service';


@Component({
  selector: 'app-order-history',
  template: `
    <table>
  <tr>
    <th>Purchase ID</th>
    <th>Total</th>
    <th>Items</th>
  </tr>

  <tr *ngFor="let order of orders" >
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
          <th>Star Rating</th>
        </tr>

        <tr *ngFor="let product of selectedOrderProducts">
          <td>{{product.name}}</td>
          <td>{{product.category}}</td>
          <td>{{product.price}}</td>
          
          <td><select #selectedOption value={{product.starRating}}>
            <option value="5">*****</option>
            <option value="4">****</option>
            <option value="3">***</option>
            <option value="2">**</option>
            <option value="1">*</option>
            </select>
          </td>

          <td><input type="button" value="Update Star Rating"
            (click)="updateStarRating(product,selectedOption.value)"/>
          </td>
        </tr>
      </table>
 `,
  styles: []
})
export class OrderHistoryComponent implements OnInit {

  constructor(private orderService: OrderService, private productService: ProductService) { }
  
  ngOnInit() {
    this.orderService.getUserOrders(this.user).subscribe(res =>{this.putDatainOrders(res)}); //(this.orders = orders)); 
  }

  selectedOrderProducts : Product[] =[];
  selectedOrder:Order;
  user=sessionStorage.getItem("user");
  
  orders:any; 

  putDatainOrders(res){

    if(res==0){
        this.orders=null;
    }
    else{
        this.orders=res;
    }
 }

  viewItems(selectedOrder : Order){
      this.selectedOrder = selectedOrder;
      console.log("Order Items : "+this.selectedOrder);
      
      if (selectedOrder) {
        this.selectedOrderProducts=JSON.parse(this.selectedOrder.items);
      }
  }

  updateStarRating(product,ratingSelected){

      product.starRating=ratingSelected;       
      this.productService.updateStarRating(product);
  }
}