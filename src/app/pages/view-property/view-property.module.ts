import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPropertyPage } from './view-property.page';

import { ViewContactDetailsPageModule } from '../view-contact-details/view-contact-details.module';
import { ViewContactDetailsPage } from '../view-contact-details/view-contact-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPropertyPage
  }
];

@NgModule({
  declarations: [ViewPropertyPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewContactDetailsPageModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    ViewContactDetailsPage
  ],
  exports: [ViewPropertyPage]
})
export class ViewPropertyPageModule { }
