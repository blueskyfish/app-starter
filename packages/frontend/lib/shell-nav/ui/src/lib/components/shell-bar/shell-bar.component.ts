import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ShellBarItem, ShellBarItemList } from '@blueskyfish/frontend-shell-nav-service';
import { isEmpty } from '@blueskyfish/grundel';

@Component({
  selector: 'app-shell-bar',
  templateUrl: './shell-bar.component.html',
  styleUrls: ['./shell-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShellBarComponent {

  expanded = false;

  /**
   * The list of shell bar items.
   */
  @Input()
  items!: ShellBarItemList;

  @Output()
  execute: EventEmitter<ShellBarItem> = new EventEmitter<ShellBarItem>(true);

  get hasItems(): boolean {
    return !isEmpty(this.items);
  }
}
