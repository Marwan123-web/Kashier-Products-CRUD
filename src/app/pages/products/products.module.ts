import { ToasterComponent } from './../../components/toaster/toaster.component';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from 'ng-click-outside';

import { RouterModule } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { PopupComponent } from 'src/app/components/popup/popup.component';

const router = [
  {
    path: '',
    component: ProductsComponent,
    data: {
      title: 'Products',
      permissions: {
        only: ['ADMIN', 'View Products'],
        redirectTo: '/pages/home',
      },
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
  ],
  declarations: [
    ProductsComponent,
    ProductFormComponent,
    PopupComponent,
    ToasterComponent,
  ],
  providers: [],
})
export class ProductsModule {}
