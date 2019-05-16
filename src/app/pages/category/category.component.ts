import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  categoryId: any;
  category: Category;
  token: any;
  private localStorage: any;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private _categoryService: CategoryService) {
      this.localStorage = localStorage;
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = Number.parseInt(params['categoryId']);
   });

   console.log(this.localStorage);
   this.token = this.localStorage["token"];
   console.log(this.token);

   try {
    this._categoryService.getCategory(this.categoryId).subscribe(
      data => {
        var selectedCategory = new Category(
          data["categoryId"],
          data["categoryName"],
          data["categoryDescription"],
          data["categoryImage"],
          data["products"]
        );
        this.category = selectedCategory;
      }
    )
   } catch(e) {

   }
 
  }

}
