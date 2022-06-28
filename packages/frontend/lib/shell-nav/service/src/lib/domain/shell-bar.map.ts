import { ShellBarRecord } from './shall-bar.record';

/**
 * The structure of the global item map. The **id** is the key of the {@link ShellBarRecord}.
 */
export type ShellBarItemMap = {
  [id: string]: ShellBarRecord;
};
