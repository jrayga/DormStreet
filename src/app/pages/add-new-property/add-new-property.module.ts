import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddNewPropertyPage } from './add-new-property.page';

import { PaymentMethodsPageModule } from '../payment-methods/payment-methods.module';
import { PaymentMethodsPage } from '../payment-methods/payment-methods.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewPropertyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentMethodsPageModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    PaymentMethodsPage
  ],
  declarations: [AddNewPropertyPage]
})
export class AddNewPropertyPageModule { }
