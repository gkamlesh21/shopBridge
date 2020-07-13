import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  angForm: FormGroup;
  product: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private productsService: ProductsService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.productsService.editProduct(params['id']).subscribe(res => {
        this.product = res;
      });
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', Validators.required]
    });
  }

  updateProduct(ProductName, ProductDescription, ProductPrice) {
    this.route.params.subscribe(params => {
      this.productsService.updateProduct(ProductName, ProductDescription, ProductPrice, params.id);
      this.router.navigate(['products']);
    });
  }

}