import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login-view',
  template: ` <p>login-view works!</p> `,
  styleUrls: ['./login-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
