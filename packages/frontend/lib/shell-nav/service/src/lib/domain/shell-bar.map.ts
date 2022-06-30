import { ShellBarRecord } from './shall-bar.record';
import { ShellBarItem } from './shell-bar.item';

/**
 * The structure of the global item map. The **id** is the key of the {@link ShellBarRecord}.
 */
export type ShellBarItemMap = {
  [id: string]: ShellBarRecord;
};

export type ShellBarItemList = (ShellBarItem | '-')[];
