import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {

  private productId: number;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private _productService: ProductService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.productId = Number.parseInt(params['productId']);
   });

   this._productService.getProduct(this.productId).subscribe(data => {
    this.product = data;
    console.log(data);
   });
  }
}
