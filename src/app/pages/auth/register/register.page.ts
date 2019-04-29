import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from './../../../services/alert.service';
import { LoginPage } from './../login/login.page';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  dimissRegister() {
    this.modalController.dismiss();
  }

  async loginModal() {
    this.dimissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage
    });

    return await loginModal.present();
  }

  register(form: NgForm) {
    this.authService.register(form.value.uName, form.value.fName, form.value.lName, 
      form.value.email, form.value.password).subscribe(
        data => {
          console.log("Correct");
          /* this.authService.login(form.value.email,
            form.value.password).subscribe(
              data => {

              },
              error => {
                console.log(error);
              },
              () => {
                this.dimissRegister();
                this.navCtrl.navigateRoot("/dashboard");
              }
            ); */
            this.alertService.presentToast("User " + form.value.uName +" registered.");
            this.dimissRegister();
           // this.navCtrl.navigateRoot("/dashboard");
        },
        error => {
          console.log(error);
        },
        () => {

        }
      );
  }

}
