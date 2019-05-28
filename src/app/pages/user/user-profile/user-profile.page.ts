import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {


  userProfile: any;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.getUserPofile();
  }

 getUserPofile() {
    this._authService.getUserProfile().subscribe(data => {
      this.userProfile = data;
      console.log(data);
    });
  }


}
