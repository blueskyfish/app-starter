import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ShellBarItem } from '@blueskyfish/frontend-shell-nav-service';

@Component({
  selector: 'app-shell-bar',
  templateUrl: './shell-bar.component.html',
  styleUrls: ['./shell-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShellBarComponent implements OnInit {

  expanded = false;

  @Input()
  items!: ShellBarItem[];

  @Output()
  execute: EventEmitter<ShellBarItem> = new EventEmitter<ShellBarItem>(true);

  constructor() {}

  ngOnInit(): void {

  }
}
