import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {

  users: any;

  constructor(
    private _authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this._authService.getAllUsers().subscribe(
      data => {
        this.users = data;
        console.log(data);
      }
    )
  }

  deleteUser(id) {
    this._authService.deleteUser(id).subscribe(
      data => {
        this.users.map((x,y) => x.id == id ? this.users.splice(y,1): '');
        this.alertService.presentToast("User succesfully deleted!");
      }
    )
  }

}
