import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;
  categories: any;

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private _categoryService: CategoryService
  ) {
    this.menu.enable(true);
   }

  ngOnInit() {
    this._categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      }
    )
    console.log(this.categories);
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    )
  }

}
