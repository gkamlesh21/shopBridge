import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uri = 'http://localhost:4000/products';

  constructor(private http: HttpClient) { }

  addProduct(ProductName, ProductDescription, ProductPrice, ProductImage?: any) { //
    const obj = {
      ProductName,
      ProductDescription,
      ProductPrice,
      ProductImage
    };
    // console.log(obj);
    return this.http.post(`${this.uri}/add`, obj)
    // .subscribe((res) => {
    //   console.log('Done', res)
    // });
  }

  getProducts() {
    return this.http.get(`${this.uri}`);
  }

  editProduct(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  updateProduct(ProductName, ProductDescription, ProductPrice, id, ProductImage?: any) {
    const obj = {
      ProductName,
      ProductDescription,
      ProductPrice,
      ProductImage
    };
    // console.log(obj);
    return this.http.post(`${this.uri}/update/${id}`, obj)
      // .subscribe((res) => {
      //   console.log('Done', res)
      // });
  }

  deleteProduct(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }

  detailProduct(id) {
    return this.http.get(`${this.uri}/detail/${id}`);
  }
}
