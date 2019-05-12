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
  category: any;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private _categoryService: CategoryService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = Number.parseInt(params['categoryId']);
      console.log(this.categoryId);
   });

   try {
    this._categoryService.getCategory(this.categoryId).subscribe(
      data => {
        this.category = data;
      }
    )
   } catch(e) {

   }
 
  }

}
