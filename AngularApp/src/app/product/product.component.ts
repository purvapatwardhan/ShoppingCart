import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductService } from './product.service';
import { FilterArrayPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Router } from '@angular/router';

import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  template:`

<table border="2">
  <tr>
    <th>Name</th>
    <th>Category 
        <select [(ngModel)]="filterText">
        <option style=selected value='Select'>All Categories</option>
        <option value='HouseHold'>HouseHold</option>
        <option value='Electronics'>Electronics</option>
        <option value='Electricals'>Electricals</option>
        </select>
    </th>
    <th>Price</th>
    <th>Star Rating</th>
    <th>Add to Cart</th>
    <th>Add to Compare</th>
  </tr>

  <tr *ngFor="let product of products | filter: filterText" >
        <td>{{product.name}}</td>
        <td>{{product.category}}</td>
        <td>{{product.price}}</td>
        <td>{{product.starRating}}</td>
        
        <td><input type="button" value="Add"
            (click)="addToCart(product)"/>
        </td>

        <td><input type="button" value="CompareProducts" 
            (click)="compareProducts(product)"/>
        </td>
  </tr>
</table>

<br><br>

<div *ngIf="selectedProduct">
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
  <tr>
   <td>Total :</td><td>{{total}}</td>
   <td><input type="button" value="Checkout" 
            (click)="NavigateToCheckout()"/>
        </td>
  </tr>
</table>
</div>

<br><br>
     <div *ngIf="toCompare">
      <h3>Compare Products</h3>
      <table border="2">
      <tr>
      <th>Name</th>
      <th>Category</th>
      <th>Price</th>
      <th>Star Rating</th>
      </tr>

      <tr *ngFor="let product of compareProd">
        <td>{{product.name}}</td>
        <td>{{product.category}}</td>
        <td>{{product.price}}</td>
        <td>{{product.starRating}}</td>
      </tr>
      </table>

`,
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})

export class ProductComponent implements OnInit {
  
  @Input() prodId: number;
    
  product: Observable<Product[]>;

  title = 'Shopping Cart';
  cart : Product[] =[];
  compareProd : Product[] =[];
  total=0;

  products: any;//Product[];
  selectedProduct: Product;
  toCompare:Product;

  constructor(private productService: ProductService,private router: Router) {}

  ngOnInit() {
    sessionStorage.setItem("cart",JSON.stringify(this.cart));
    sessionStorage.setItem("cartTotal",JSON.stringify(this.total));
    
    this.productService
      .getProducts(this.prodId)
      .subscribe(products => (this.products = products));
  }

  compareProducts(toCompare : Product)
  {
      this.toCompare = toCompare;

      if(toCompare){
        this.compareProd.push(toCompare);
      }
  }

  addToCart(selectedProduct: Product) {
    this.selectedProduct = selectedProduct;
    console.log("in add to cart : "+this.selectedProduct);
    if (selectedProduct) {

      this.cart=JSON.parse(sessionStorage.getItem("cart"));
      this.cart.push(this.selectedProduct);
      sessionStorage.setItem("cart", JSON.stringify(this.cart));

      this.total=JSON.parse(sessionStorage.getItem("cartTotal"));
      this.total+=this.selectedProduct.price;
      sessionStorage.setItem("cartTotal", JSON.stringify(this.total));
   }
  }

  NavigateToCheckout(){
      //navigate to checkout page
      this.router.navigateByUrl('/check-out');
  }

  removeFromCart(selectedProduct: Product) {

    this.cart=JSON.parse(sessionStorage.getItem("cart"));
    
    var index:number=-1;
    for (var i = 0; i < this.cart.length; i++) {
      if(this.cart[i]._id===selectedProduct._id)
      {
        index=i;
        
        if (index !== -1) {
          console.log("Price to remove : " + selectedProduct.price + " from index : "+index);

          this.cart.splice(index, 1);
          sessionStorage.setItem("cart", JSON.stringify(this.cart));

          this.total=JSON.parse(sessionStorage.getItem("cartTotal"));
          this.total=this.total-selectedProduct.price;
          sessionStorage.setItem("cartTotal",JSON.stringify(this.total));
        }
        break;
      }
    }
    
  }
}
