import {
    Component,
    Input,
    OnChanges,
    OnInit,
    Output,
    EventEmitter,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Product } from 'src/app/shared/models/Product'

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnChanges {
    @Input() selectedProduct: any
    @Output() closeForm = new EventEmitter()
    @Output() addEditProduct = new EventEmitter()
    @Output() deleteProductEmit = new EventEmitter()
    productForm: FormGroup = new FormGroup({})
    showenPasswrd: boolean = false
    productTypes: any[] = [
        {
            name: 'Type 1',
            value: 1,
        },
        {
            name: 'Type 2',
            value: 2,
        },
    ]

    constructor() {
        this.setForm(this.selectedProduct)
    }

    setForm(product:Product) {
        this.productForm = new FormGroup({
            id: new FormControl(product?.id ? product?.id : 0),
            name: new FormControl(product?.name ? product?.name  : '', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30),
            ]),
            productType: new FormControl(product?.productType ? product?.productType : 1, [
                Validators.required,
            ]),
            productCategory: new FormControl(
                product?.productCategory ? product?.productCategory : '',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(20),
                ]
            ),
            subCategory: new FormControl(product?.subCategory ? product?.subCategory : false),
            referenceId: new FormControl(product?.referenceId ? product?.referenceId : ''),
            password: new FormControl(product?.password ? product?.password : '', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(15),
            ]),
            deleveryFeesAmount: new FormControl(
                product?.deleveryFeesAmount ? product?.deleveryFeesAmount : '',
                [Validators.required]
            ),
            deleveryFeesPercentage: new FormControl(
                product?.deleveryFeesPercentage ? product?.deleveryFeesPercentage : '',
                [Validators.required]
            ),
        })
    }

    ngOnChanges(): void {  
        this.setForm(this.selectedProduct)
    }

    ngOnInit(): void {
        this.productForm.controls.deleveryFeesAmount.valueChanges.subscribe((str: string) => {            
            const newVal = str.replace(/ /g, '' ).replace(/[^0-9]/g, '')
            this.productForm.controls.deleveryFeesAmount.setValue(newVal, {emitEvent: false});
        });
        this.productForm.controls.deleveryFeesPercentage.valueChanges.subscribe((str: string) => {
            console.log(str);
            const newVal = str.replace(/ /g, '' ).replace(/[^0-9]/g, '')
            this.productForm.controls.deleveryFeesPercentage.setValue(newVal, {emitEvent: false});
        });
    }

    saveProduct() {    
        this.productForm.valid ? 
            this.addEditProduct.emit(this.productForm.value) : this.productForm.markAllAsTouched();
    }

    deleteProduct() {
        this.deleteProductEmit.emit(this.productForm.value)
    }

    cancel() {
        this.closeForm.emit()
    }

    chanegePasswordType() {
        let x = document.getElementById('inputPassword') as HTMLInputElement
        x.type = x.type === 'password' ? 'text' : 'password'
    }

}
