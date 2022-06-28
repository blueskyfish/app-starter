import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shell-bar',
  templateUrl: './shell-bar.component.html',
  styleUrls: ['./shell-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShellBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
