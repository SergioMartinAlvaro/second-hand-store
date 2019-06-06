import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from './../../../services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private localStorage: any;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {
    this.localStorage = localStorage;
   }

  ngOnInit() {
  }

  dimissLogin() {
    this.modalController.dismiss();
  }

  async registerModal() {
    this.dimissLogin();
    const registerModal  = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  login(form: NgForm) {
    this.authService.login(form.value.uName, form.value.password).subscribe(
      data => {
        this.alertService.presentToast("Logged In");
        this.dimissLogin();
        this.navCtrl.navigateRoot('/');
      },
      error => {
        this.handleError(error);
      },
      () => {
        this.dimissLogin();
        this.navCtrl.navigateRoot('/dashboard');
      }
    )
  }

  private handleError(error) {
    if(error.status == 500) {
      this.alertService.presentToast("Database not available, contact with IT team.");
    } else if(error.status == 400) {
      this.alertService.presentToast("Incorrect Login, please, review the form.");
    } else {
      this.alertService.presentToast("Unexpected error, contact with IT team.");
    }
  }

}
