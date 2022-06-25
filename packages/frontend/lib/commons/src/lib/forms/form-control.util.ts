import { FormControl, ValidatorFn } from '@angular/forms';

/**
 * Create a {@link FormControl} instance with the given values from the parameters
 *
 * @param value the initial value
 * @param disabled set control disabled or not
 * @param validators the list of validators
 */
export const createFormControl = <T>(value: T, disabled: boolean = false, ...validators: ValidatorFn[]): FormControl<T> => {
  return new FormControl<T>({
    value,
    disabled,
  }, {
    nonNullable: true,
    validators,
  });
}
