/**
 * The global bar item
 */
export type ShellBarItem = {
  /**
   * The unique identifier
   */
  id: string;

  /**
   * The MDI icon css definition
   */
  icon: string;

  /**
   * The title
   */
  title: string;

  /**
   * Selected or deselected
   */
  selected: boolean;

  /**
   * The user permission
   */
  permission: string;
};
