import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  productList: any = new BehaviorSubject<Product[]>([
    {
      id: 1,
      name: 'Iphone 13',
      productType: 1,
      productCategory: 'Apple',
      subCategory: false,
      referenceId: 1,
      password: '',
      deleveryFeesAmount: 100,
      deleveryFeesPercentage: 1.5,
    },
    {
      id: 2,
      name: 'Samsung Galaxy Note 20',
      productType: 2,
      productCategory: 'Samsung',
      subCategory: true,
      referenceId: 2,
      password: '',
      deleveryFeesAmount: 200,
      deleveryFeesPercentage: 2.5,
    },
    {
      id: 3,
      name: 'Hawawi m9',
      productType: 2,
      productCategory: 'Hawawi',
      subCategory: true,
      referenceId: 3,
      password: '',
      deleveryFeesAmount: 300,
      deleveryFeesPercentage: 3.5,
    },
    {
      id: 4,
      name: 'Mi Note 8',
      productType: 1,
      productCategory: 'Mi',
      subCategory: true,
      referenceId: 4,
      password: '',
      deleveryFeesAmount: 400,
      deleveryFeesPercentage: 4.5,
    },
  ]);
  constructor() {}

  addProduct(product: Product) {
    let res = this.productList.getValue();
    res.unshift(product);
    this.productList.next(res);
  }

  updateProduct(product: Product) {
    let res = this.productList.getValue();
    let index = res.findIndex((item: any) => item.id == product.id);
    if (index != -1) {
      res[index] = product;
      this.productList.next(res);
    }
  }

  deleteProduct(product: Product) {
    let res = this.productList.getValue();
    let index = res.findIndex((item: any) => item.id == product.id);
    if (index != -1) {
      res.splice(index, 1);
      this.productList.next(res);
    }
  }
}
