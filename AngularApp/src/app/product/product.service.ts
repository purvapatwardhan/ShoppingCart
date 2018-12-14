import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export class Product {
  _id: number;
  name: string;
  category:string;
  price:number;
  starRating:string;
}

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(prodId: number) {
    return this.http
      .get('http://localhost:3000/products').pipe(map(productsData => productsData));
  }

  updateStarRating(product){
  console.log("In product service");
  }
}
