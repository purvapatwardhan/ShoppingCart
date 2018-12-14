import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export class Order {
  _id: number;
  user: string;
  purchaseId:number;
  total:number;
  items:string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get('http://localhost:3000/order').pipe(map(ordersData => ordersData));
  }

  getUserOrders(user){
    var url='http://localhost:3000/order/user?userName='+user;
    return this.http.get(url).pipe(map(ordersData => ordersData));
  }
}

