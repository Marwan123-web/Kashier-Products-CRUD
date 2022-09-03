import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';
  openedProductEditor: boolean = false;
  showconfirmationPopup: boolean = false;
  showToaster: boolean = false;
  message: string = '';

  selectedProduct: any;
  showProductForm: boolean = false;
  productList: any;
  popupType: string = '';

  constructor(private store: StoreService) {}

  filterProducts() {
    const trimmed = this.searchTerm?.trim();
    this.filteredProducts = this.products.filter((item: any) => {
      return item.name.includes(trimmed);
    });
  }

  ngOnInit() {
    this.store.productList.subscribe((items: any) => {
      this.products = items;
      this.filteredProducts = items;
      this.productList = items.length;
    });
  }

  addNewProduct() {
    this.selectedProduct = null;
    this.showProductForm = true;
    this.openedProductEditor = false;
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.showProductForm = true;
    this.openedProductEditor = false;
  }

  closeForm() {
    this.showconfirmationPopup = false;
    this.showProductForm = false;
    this.selectedProduct = null;
  }

  updateDeleteProduct(product: Product, type: string) {
    this.selectedProduct = product;
    this.showconfirmationPopup = true;
    this.popupType = type;
  }

  saveProduct(product: Product) {
    if (product.id == 0) {
      product.id = ++this.productList;
      this.store.addProduct(product);
      this.message = 'Product Added Successfully';
      this.showToaster = true;
    } else {
      this.store.updateProduct(product);
      this.message = 'Product Updated Successfully';
      this.showToaster = true;
    }

    this.showProductForm = false;
    this.showconfirmationPopup = false;
    this.selectedProduct = null;
  }

  deleteProduct(product: Product) {
    this.store.deleteProduct(product);
    this.showProductForm = false;
    this.showconfirmationPopup = false;
    this.selectedProduct = null;
    this.message = 'Product Deleted Successfully';
    this.showToaster = true;
  }
}
