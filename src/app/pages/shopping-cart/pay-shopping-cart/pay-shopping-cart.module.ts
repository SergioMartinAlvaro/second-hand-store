import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PayShoppingCartPage } from './pay-shopping-cart.page';

const routes: Routes = [
  {
    path: '',
    component: PayShoppingCartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PayShoppingCartPage]
})
export class PayShoppingCartPageModule {}
