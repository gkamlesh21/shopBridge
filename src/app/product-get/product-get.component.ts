import { Component, OnInit } from '@angular/core';
import Product from '../Product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {

  products: any = [];
  message: string = '';
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService
      .getProducts()
      .subscribe(
        (data: Product[]) => {
          console.log(data);
          this.products = data;
        },
        (err: any) => {
          console.log(err);
          this.message = "Error!!! Data Not Found";
        });
  }

  deleteProduct(id) {
    this.productsService.deleteProduct(id).subscribe(res => {
      this.products.splice(id, 1);
    });
  }

}
