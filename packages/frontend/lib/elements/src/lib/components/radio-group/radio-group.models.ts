
export type RadioGroupValue = string | number;

export interface RadioGroupItem {
  label: string;
  icon?: string;
  value: RadioGroupValue;
  disabled?: boolean;
}
