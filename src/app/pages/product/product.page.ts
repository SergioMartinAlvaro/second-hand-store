import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { ProductService } from './../../services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  products: Product[];
  token: any;
  private localStorage: any;

  public productOptions = [
    {
      title: "Edit",
      image: "edit.png",
      routerLink: '/update-product/'
    },
    {
      title: "Delete",
      image: "delete.png",
      routerLink: '/delete-product/'
    }
  ];

  constructor(private _productService: ProductService) {
    this.localStorage = localStorage;
   }

  ngOnInit() {
    var userID = jwt_decode(this.localStorage["token"])["UserID"];
    this._productService.getProductsByUserId(userID).subscribe(data => {
      this.products = data;
    });
  }

}
