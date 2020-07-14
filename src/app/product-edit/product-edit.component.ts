import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  angForm: FormGroup;
  product: any = {};
  images: string;

  constructor(private route: ActivatedRoute, private router: Router, private productsService: ProductsService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.productsService.editProduct(params['id']).subscribe(res => {
        console.log(res);
        this.product = res;
      });
    });
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      ProductName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      ProductPrice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  updateProduct(ProductName, ProductDescription, ProductPrice, ProductImage?) {
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

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
    console.log(this.images);
  }

  uploadForm(ProductName, ProductDescription, ProductPrice, ProductImage?) {
    this.route.params.subscribe(params => {
      this.productsService.updateProduct(ProductName, ProductDescription, ProductPrice, params.id, ProductImage)
      .subscribe(
        (res) => {
          console.log('Done', res);
        },
        (err) => {
          console.log('Error', err)
        });;
      this.router.navigate(['products']);
    });
  }

}