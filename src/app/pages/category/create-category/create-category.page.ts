import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { AlertService } from './../../../services/alert.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
})
export class CreateCategoryPage implements OnInit {

  constructor(
    private _categoryService: CategoryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

  }

  createCategory(form: NgForm) {
    try {
      if(form.value.Name && form.value.Description) {
        this._categoryService.createCategory(form.value.Name, form.value.Description)
        .subscribe(data => {
          this.alertService.presentToast("Category created succesfully!");
          form.reset();
        });
      } else {
        this.alertService.presentToast("Please, fill all the fields to create a new category.");
      }
    } catch(e) {
      this.alertService.presentToast("Unexpected error during category creation.");
    }
   

  }

}
