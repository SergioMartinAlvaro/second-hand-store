import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { AlertService } from '../../../services/alert.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.page.html',
  styleUrls: ['./update-category.page.scss'],
})
export class UpdateCategoryPage implements OnInit {

  categoryId;
  category;

  constructor(
    private route: ActivatedRoute,
    private _categoryService: CategoryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = Number.parseInt(params['categoryId']);
   });

   this._categoryService.getCategory(this.categoryId).subscribe(data => {
    this.category = data;
   });
  }

  
  updateCategory(form: NgForm) {
    try {
      if(form.value.Name && form.value.Description) {
        if(form.value.Name.length < 16) {
          this._categoryService.updateCategory(this.categoryId, form.value.Name, form.value.Description)
          .subscribe(data => {
            this.alertService.presentToast("Category updated succesfully!");
            form.reset();
          });
        } else {
          this.alertService.presentToast("Category name cannot has more than 9 chars.");
        }
      } else {
        this.alertService.presentToast("Please, fill all the fields to update the category.");
      }
    } catch(e) {
      this.alertService.presentToast("Unexpected error during category update.");
    }

}}
