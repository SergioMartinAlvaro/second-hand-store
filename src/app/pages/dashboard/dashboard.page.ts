import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Category } from 'src/app/models/category';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;
  userProfile: any;
  categories: any;
  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  }
  private localStorage: any;

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private _categoryService: CategoryService
  ) {
    this.menu.enable(true);
    this.localStorage = localStorage;
   }

  ngOnInit() {
    this._categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
    this.authService.getUserProfile().subscribe(
      data => {
        this.userProfile = data;
        console.log(this.userProfile);
      }
    )
    console.log(this.userProfile);
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    )
  }

}
