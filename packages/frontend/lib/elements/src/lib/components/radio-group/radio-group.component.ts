import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { RadioGroupItem, RadioGroupValue } from "./radio-group.models";

@Component({
  selector: 'app-radio-group',
  template: `
    <div class="btn-group app-radio-group">
      <ng-container *ngFor="let item of options; let index = index">
        <input
          type="radio"
          [name]="name"
          [value]="item.value"
          class="btn-check"
          autocomplete="off"
          [disabled]="disabled || !!item.disabled"
          id="{{ name }}-{{ index }}"
          [(ngModel)]="value"
        >
        <label
          class="btn btn-outline-primary app-no-focus"
          for="{{ name }}-{{ index }}"
        >
          <i [ngClass]="item.icon" *ngIf="item.icon"></i>
          <span [class.ms-2]="item.icon">{{ item.label }}</span>
        </label>
      </ng-container>
    </div>
  `,
  styles: [`
    .app-radio-group {

    }
  `],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    }
  ]
})
export class RadioGroupComponent implements ControlValueAccessor {
  private onChange = (value: RadioGroupValue) => {};
  private onTouched = () => {};
  private _value: RadioGroupValue = ''

  name = 'app-radio-group-button-' + Math.random().toString(16).substring(2);

  disabled = false;

  get value(): RadioGroupValue {
    return this._value;
  }

  set value(value: RadioGroupValue) {
    if (this._value !== value) {
      this._value = value;
      this.onChange(value);
    }
  }

  @Input()
  options: RadioGroupItem[] = [];


  writeValue(value: RadioGroupValue): void {
    if (this._value !== value) {
      this._value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled !== this.disabled) {
      this.disabled = isDisabled;
    }
  }



}
