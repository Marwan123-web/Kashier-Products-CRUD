import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  @Input() message: string = '';
  @Output() closeToasterEmitter = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.closeToasterEmitter.emit();
    }, 2000);
  }

  closeToaster() {
    this.closeToasterEmitter.emit();
  }
}
