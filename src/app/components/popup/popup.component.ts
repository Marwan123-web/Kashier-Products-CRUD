import { Product } from '../../shared/models/Product';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit, OnChanges {
  @Input() popupType: string = 'update';
  @Input() seletcedProduct: Product = {};
  @Output() closePopupEmitter = new EventEmitter();
  @Output() addEditProduct = new EventEmitter();
  @Output() deleteProductEmit = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.seletcedProduct?.id == 0 ) this.popupType = 'add';
  }
  closePopup() {
    this.closePopupEmitter.emit();
  }

  deleteProduct() {
    this.deleteProductEmit.emit(this.seletcedProduct);
  }

  saveProduct() {
    this.addEditProduct.emit(this.seletcedProduct);
  }
}
