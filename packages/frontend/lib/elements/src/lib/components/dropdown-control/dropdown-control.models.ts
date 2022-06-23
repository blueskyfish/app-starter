/**
 * The value of the dropdown id
 */
export type DropdownValue = number | string;

/**
 * The interface is the item of the dropdown control
 */
export interface DropdownItem {

  /**
   * The id of the dropdown item as string or number
   */
  id: DropdownValue;

  /**
   * The title of the dropdown item
   */
  title: string;

  /**
   * A teaser or description
   */
  teaser?: string;

  /**
   * The optional icon
   */
  icon?: string;

  /**
   * The flag for aktive or deactivated
   */
  active: boolean;

  /**
   * The data container for the dropdown item
   */
  data?: any;
}
