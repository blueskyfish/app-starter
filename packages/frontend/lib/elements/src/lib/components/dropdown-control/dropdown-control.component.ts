import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isEmpty, isNil } from '@blueskyfish/grundel';
import { DropdownItem, DropdownValue } from './dropdown-control.models';

@Component({
  selector: 'app-dropdown-control',
  template: `
    <div ngbDropdown [ngClass]="styleClass" class="app-dropdown-control d-flex align-items-center">
      <label class="form-label me-2 mb-0">{{ label }}</label>
      <button [ngClass]="buttonStyleClass" ngbDropdownToggle class="button-toggle d-flex flex-grow-1 align-items-center" [disabled]="disabled">
        <i [ngClass]="icon || ''" class="me-1"></i>
        <span class="flex-grow-1 text-start">{{ selection?.title || title }}</span>
      </button>
      <div ngbDropdownMenu>
        <div
          class="button-item d-flex flex-column"
          [ngClass]="itemStyleClass"
          [class.active]="item.active"
          ngbDropdownItem
          (click)="selectItem(item.id)"
          *ngFor="let item of options"
        >
          <div class="app-title d-flex align-items-center">
            <i [ngClass]="item.icon || icon || ''" class="me-1"></i>
            <span class="text-start">{{ item.title }}</span>
          </div>
          <div class="app-teaser" *ngIf="item.teaser">
            {{ item.teaser }}
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [ './dropdown-control.component.scss' ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownControlComponent),
      multi: true,
    }
  ]
})
export class DropdownControlComponent implements OnInit, OnChanges, ControlValueAccessor {

  private initialized = false;
  private onChange = (value: DropdownValue): void => {};
  private onTouched = (): void => {};
  private _value: DropdownValue | null = null;

  /**
   * Disabled / Enabled the dropdown toggle button
   * @type {boolean}
   */
  disabled = false;

  /**
   * The selected item
   * @type {DropdownItem}
   */
  selection: DropdownItem | null = null;

  /**
   * The class style of the container
   * @type {string}
   */
  @Input()
  styleClass = '';

  /**
   * The button styles
   * @type {string}
   */
  @Input()
  buttonStyleClass = 'btn btn-outline-secondary';

  /**
   * The item button style classes
   * @type {string}
   */
  @Input()
  itemStyleClass = '';

  /**
   * The default title of the button if no dropdown item is selected
   *
   * @type {string}
   */
  @Input()
  title?: string;

  /**
   * The label to the dropdown
   * @type {string}
   */
  @Input()
  label?: string;

  @Input()
  icon?: string;

  /**
   * The list of dropdown items
   *
   * @type {DropdownItem[]}
   */
  @Input()
  options: DropdownItem[] = [];

  ngOnInit() {
    this.initialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.updateSelection(changes['options'].currentValue, this._value);
    }
  }

  selectItem(value: DropdownValue): void {
    this.updateSelection(this.options, value);
    if (this.initialized) {
      this.onChange(value);
    }
  }

  writeValue(value: DropdownValue): void {
    if (this._value !== value) {
      this._value = value;
      this.updateSelection(this.options, value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.disabled !== isDisabled) {
      this.disabled = isDisabled;
    }
  }

  private updateSelection(options: DropdownItem[], value: DropdownValue | null): void {
    if (isEmpty(options) || isNil(value)) {
      return;
    }
    this._value = value;
    this.selection = options.find((item) => item.id === value) ?? null;
    options.forEach((item) => item.active = item.id === value);
  }
}
