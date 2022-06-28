import { ShellBarItem } from './shell-bar.item';

/**
 * The global record without the attribute **id**
 */
export type ShellBarRecord = Omit<ShellBarItem, 'id' | 'selected'>;
