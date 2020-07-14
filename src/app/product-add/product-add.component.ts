import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  images: string;
  angForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private http: HttpClient) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  ngOnInit(): void {
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
    // console.log(this.images);
  }


  addProduct(ProductName, ProductDescription, ProductPrice, ProductImage?) {
    if (this.images != undefined) {
      const formData = new FormData();
      formData.append('file', this.images);

      this.http.post<any>('http://localhost:3000/file', formData).subscribe(
        res => {
          // console.log(res);
          ProductImage = res.filename;
          this.uploadForm(ProductName, ProductDescription, ProductPrice, ProductImage);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.uploadForm(ProductName, ProductDescription, ProductPrice);
    }
  }

  uploadForm(ProductName, ProductDescription, ProductPrice, ProductImage?) {
    this.productsService.addProduct(ProductName, ProductDescription, ProductPrice, ProductImage).subscribe(
      (res) => {
        console.log('Done', res);
        this.createForm();
      },
      (err) => {
        console.log('Error', err)
      }
    );
  }

}
