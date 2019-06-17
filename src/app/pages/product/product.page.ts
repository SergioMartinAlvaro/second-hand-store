import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { ProductService } from './../../services/product.service';
import { Product } from 'src/app/models/product';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';

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

  constructor(private _productService: ProductService,
    private navCtrl: NavController,
    private alertService: AlertService) {
    this.localStorage = localStorage;
   }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe(
      data => {
        this.alertService.presentToast("Product and releated transactions deleted");
        this.navCtrl.navigateRoot('/dashboard');
        console.log(this.products);
      }
    )
  }

  ionViewWillEnter() {
    var userID = jwt_decode(this.localStorage["token"])["UserID"];
    this._productService.getProductsByUserId(userID).subscribe(data => {
      this.products = data;
    });
  }

  ngOnInit() {
    var userID = jwt_decode(this.localStorage["token"])["UserID"];
    this._productService.getProductsByUserId(userID).subscribe(data => {
      this.products = data;
    });
  }

}
