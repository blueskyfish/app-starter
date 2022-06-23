import {
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The type of the input control
 */
export type InputControlType = 'text' | 'password' | 'email' | 'number';

/**
 * The component is an input control for **string** with label and an optional help text
 *
 * @example
 *
 * ```html
 * <app-input-control
 *   type="password"
 *   label="Password"
 *   placeHolder="Please enter your password"
 *   helpText="Password requires min. 3 signs"
 *   formControlName="password"
 * ></app-input-control>
 */
@Component({
  selector: 'app-input-control',
  template: `
    <div class="mb-3 app-input-control">
      <label class="form-label" [for]="inputId">{{ label }}</label>
      <input
        class="form-control"
        [(ngModel)]="value"
        [id]="inputId"
        [type]="type"
        [placeholder]="placeHolder"
        [disabled]="disabled"
        autocomplete="off"
      />
      <div class="form-text" *ngIf="helpText">{{ helpText }}</div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class InputControlComponent implements OnInit, ControlValueAccessor {
  /**
   * The value of the control
   * @type {*}
   * @private
   */
  private _value?: string;

  private onUpdate = (value: string): void => {};
  private onTouched = (): void => {};

  disabled = false;

  /**
   * The input id for the label and control
   * @type {string}
   */
  inputId = 'input-control-' + Math.random().toFixed(8).substring(2);

  get value(): string {
    return this._value || '';
  }

  set value(value: any) {
    if (this._value !== value) {
      this._value = value ?? '';
      this.onUpdate(value ?? '');
    }
  }

  /**
   * The type of the input control. (Default is `text`)
   *
   * @type {InputControlType}
   */
  @Input()
  type: InputControlType = 'text';

  /**
   * The placeholder for the input control (default is `''`)
   *
   * @type {string}
   */
  @Input()
  placeHolder = '';

  /**
   * The label of the input control (**required**)
   *
   * @type {string}
   */
  @Input()
  label!: string;

  /**
   * The help text (**optional**)
   *
   * @type {string}
   */
  @Input()
  helpText?: string;

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: string): void {
    if (this._value !== value) {
      this._value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onUpdate = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.disabled !== isDisabled) {
      this.disabled = isDisabled;
    }
  }
}
