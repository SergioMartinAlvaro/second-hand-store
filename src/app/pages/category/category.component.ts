import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';

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
    private _categoryService: CategoryService,
    private alertService: AlertService,
    private navCtrl: NavController) {
      this.localStorage = localStorage;
  }

  ngOnInit() {
    this._categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  deleteCategory(id: number) {
    this._categoryService.deleteCategory(id).subscribe(
      data => {
        this.alertService.presentToast("Category successfully deleted!");
        this.navCtrl.navigateRoot('/dashboard');
      }
    )
  }

}
