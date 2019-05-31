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

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  constructor(
    private _categoryService: CategoryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

  }

  createCategory(form: NgForm) {
    try {
      if(form.value.Name && form.value.Description) {
        if(form.value.Name.length < 16) {
          this._categoryService.createCategory(form.value.Name, form.value.Description)
          .subscribe(data => {
            this.alertService.presentToast("Category created succesfully!");
            form.reset();
          });
        } else {
          this.alertService.presentToast("Category name cannot has more than 9 chars.");
        }
      } else {
        this.alertService.presentToast("Please, fill all the fields to create a new category.");
      }
    } catch(e) {
      this.alertService.presentToast("Unexpected error during category creation.");
    }
   

  }

}
