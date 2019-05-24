import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgForm } from '@angular/forms';
import { ProductService } from './../../../services/product.service';
import { Category } from 'src/app/models/category';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {

  private localStorage: any;
  categories: any;
  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private navCtrl: NavController
  ) {
    this.localStorage = localStorage;
   }

  ngOnInit() {
    this._categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      }
    )
  }

  createProduct(form: NgForm) {
    this._productService.createProduct(form.value.Name, form.value.Description, form.value.Price, form.value.Category)
      .subscribe(data => {
        console.log(data)
      });
  }

  onChange(value) {
    console.log(value);
  }

  dimissCreate() {

  }

}
