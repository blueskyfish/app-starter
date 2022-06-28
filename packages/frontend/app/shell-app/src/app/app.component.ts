import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShellBarItem } from '@blueskyfish/frontend-shell-nav-service';

@Component({
  selector: 'app-container',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  items: ShellBarItem[] = [
    {
      icon: 'mdi mdi-home',
      title: 'Home',
      id: 'home',
      permission: 'app:user',
      selected: true,
    },
    {
      icon: 'mdi mdi-information',
      title: 'About',
      id: 'about',
      permission: '',
      selected: false,
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => this.router.initialNavigation());
  }

  executeAction(action: ShellBarItem): void {
    console.log('> Debug: execute shell action =>', action);
  }
}
