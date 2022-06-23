import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'frontend-app-user';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => this.router.initialNavigation());
  }
}
