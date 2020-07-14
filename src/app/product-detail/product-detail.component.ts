import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.productsService.detailProduct(params['id']).subscribe(res => {
        console.log(res);
        this.product = res;
      });
    });
  }

}
