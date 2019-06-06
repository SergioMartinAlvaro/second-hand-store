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
  categories: any;
  token: any;
  private localStorage: any;

  public categoryOptions = [
    {
      title: "Edit",
      image: "edit.png",
      routerLink: '/update-category/'
    },
    {
      title: "Delete",
      image: "delete.png",
      routerLink: '/delete-category/'
    }
];

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private _categoryService: CategoryService) {
      this.localStorage = localStorage;
  }

  ngOnInit() {
    this._categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

}
