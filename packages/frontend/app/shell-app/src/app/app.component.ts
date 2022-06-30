import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { ShellBarItem, ShellBarItemList } from '@blueskyfish/frontend-shell-nav-service';
import { filter, map, SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly subscribers$: SubscriptionLike[] = [];

  /**
   * The list of shell actions
   */
  items: ShellBarItemList = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => this.router.initialNavigation());

    this.subscribers$.push(
      this.router.events
        .pipe(
          // @ts-ignore
          filter((ev: Event) => ev instanceof NavigationEnd),
          map((ev: NavigationEnd) => ev.url)
        )
        .subscribe((url: string) => {
          // update the list of shell bar action
          console.log('> Debug: Navigate end =>', url);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscribers$.forEach(s => s?.unsubscribe());
  }

  executeAction(action: ShellBarItem): void {
    console.log('> Debug: execute shell action =>', action);
  }
}
