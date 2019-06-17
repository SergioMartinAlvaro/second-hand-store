import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from './../../../services/alert.service';
import { LoginPage } from './../login/login.page';
import { NgForm } from '@angular/forms';
import { ShoppingcartServiceService } from 'src/app/services/shoppingcart-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  id: any;

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private _shoppingCartService: ShoppingcartServiceService) { }

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

  getUserTypes() {
    return ["Company", "User"];
  }

  register(form: NgForm) {
    if(form.value.uName && form.value.fName && form.value.lName && 
      form.value.email && form.value.password && form.value.UserType) {
        this.authService.register(form.value.uName, form.value.fName, form.value.lName, 
          form.value.email, form.value.password, form.value.UserType).subscribe(
            data => {
              this.id = form.value.uName;
              console.log("Correct");
                this.createShoppingCart();
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
      } else {
        if(!form.value.uName || !form.value.fName || !form.value.lName || 
          !form.value.email || !form.value.password || !form.value.UserType) {
            this.alertService.presentToast("Please, fill all fields to register an user.");
        } else {
          this.alertService.presentToast("Network error, contact with your IT team.");
        }
    }
  }

  createShoppingCart() {
    this._shoppingCartService.createShoppingCart(this.id).subscribe( 
      data => {
        console.log(data);
      }
    )
  }

  onChange(value) {
    console.log(value)
  }

}
