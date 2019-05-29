import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {


  userProfile: any;

  constructor(
    private _authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getUserPofile();
  }

  onChange(val) {
    
  }

  editProfile(form: NgForm) {
    if(form.value.nickName, form.value.firstName, form.value.lastName, form.value.email, form.value.UserType) {
      this._authService.editProfile(this.userProfile.id, form.value.nickName, form.value.firstName, form.value.lastName, 
        form.value.email, form.value.UserType).subscribe(data => {
          this.alertService.presentToast("User updated succesfully!");
          form.reset();
        });
    }
    else {
      this.alertService.presentToast("All fields must be filled, review the formulary.");
    }
  }

  getUserTypes() {
    return ["Company", "User"];
  }

 getUserPofile() {
    this._authService.getUserProfile().subscribe(data => {
      this.userProfile = data;
      console.log(data);
    });
  }


}
