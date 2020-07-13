import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  angForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      ProductName: ['', Validators.required ],
      ProductDescription: ['', Validators.required ],
      ProductPrice: ['', Validators.required ]
    });
  }

  addProduct(ProductName, ProductDescription, ProductPrice) {
    // console.log(ProductName, ProductDescription, ProductPrice);
    this.productsService.addProduct(ProductName, ProductDescription, ProductPrice);
  }

  ngOnInit(): void {
  }

}
