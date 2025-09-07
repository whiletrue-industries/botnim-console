import { Component, computed, effect, ElementRef, EventEmitter, input, Output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-edit-field',
  imports: [
    FormsModule,
],
  templateUrl: './edit-field.component.html',
  styleUrl: './edit-field.component.less'
})
export class EditFieldComponent {
  data = input<any>(null);
  field = input<string>('');
  label = input<string>('');
  @Output() update = new EventEmitter<any>();

  value = signal<any>(null);
  editing = signal(false);

  @ViewChild('textInput', { static: false }) textInput: ElementRef;

  constructor() {
    effect(() => {
      if (this.editing()) {
        timer(0).subscribe(() => {
          if (this.textInput && this.textInput.nativeElement) {
            this.textInput.nativeElement.focus();
          }
        });
      }
    });
    effect(() => {
      const data = this.data();
      const field = this.field();
      if (data && field) {
        this.value.set(data[field]);
      } else {
        this.value.set(null);
      }
    });
  }

  save(): void {
    const field = this.field();
    const data = this.data();
    if (field && data) {
      data[field] = this.value();
      console.log('ItemEditFieldComponent: save', field, this.value());
      this.update.emit({ [field]: this.value() });
      this.editing.set(false);
    }
  }
}
