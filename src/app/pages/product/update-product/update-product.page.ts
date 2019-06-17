import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from './../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as jwt_decode from "jwt-decode";
import { CategoryService } from 'src/app/services/category.service';
import { Product } from './../../../models/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {

  productId;
  product: Product;
  private localStorage;
  categories;

  constructor(
    private route: ActivatedRoute,
    private _productService: ProductService,
    private alertService: AlertService,
    private _categoryService: CategoryService
  ) {
    this.localStorage = localStorage;
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = Number.parseInt(params['productId']);
   });

   this._productService.getProduct(this.productId).subscribe(data => {
    this.product = data;
   });

   this._categoryService.getCategories().subscribe(
    data => {
      this.categories = data;
    }
  );
  }

  ionViewWillEnter() {
    this._productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
     });
  }


  onChange(value: string) {
    console.log(value);
  }
  
  updateProduct(form: NgForm) {
    var userID = jwt_decode(this.localStorage["token"])["UserID"];
    try {
      if(form.value.Name && form.value.Description) {
        if(form.value.Name.length < 16) {
          this._productService.updateProduct(this.productId, userID, form.value.Name, form.value.Description,
            form.value.Price, form.value.Category)
          .subscribe(data => {
            this.product = data;
            this.alertService.presentToast("Product updated succesfully!");
            form.reset();
          });
        } else {
          this.alertService.presentToast("Product name cannot has more than 9 chars.");
        }
      } else {
        this.alertService.presentToast("Please, fill all the fields to update the product.");
      }
    } catch(e) {
      this.alertService.presentToast("Unexpected error during product update.");
    }

}}
