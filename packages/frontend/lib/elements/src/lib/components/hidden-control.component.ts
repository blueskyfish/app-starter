import { Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 *
 * ```html
 * <bsf-hidden-control
 *   formCountrolName="user"
 * ></bsf-hidden-control>
 * ```
 */
@Component({
  selector: 'app-hidden-control',
  template: `<div class="app-hidden-control">{{ value | json }}</div>`,
  styles: [
    `
      .app-hidden-control {
        display: none;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HiddenControlComponent),
      multi: true,
    },
  ],
})
export class HiddenControlComponent implements ControlValueAccessor {
  private onChange = (value: any): void => {};
  private onTouched = (): void => {};

  value: any = null;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
