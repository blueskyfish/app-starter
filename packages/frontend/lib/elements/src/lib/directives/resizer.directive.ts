import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { isEmpty, isNil } from '@blueskyfish/grundel';
import { debounceTime, filter, Observable, Subject, SubscriptionLike } from 'rxjs';

@Directive({
  selector: '[resizer]'
})
export class ResizerDirective implements OnInit, AfterContentInit,OnDestroy {

  private readonly resizer$ = new Subject<DOMRectReadOnly>();
  private subscriber$!: SubscriptionLike;

  private readonly observer = new ResizeObserver(this.receiveResizing.bind(this));

  @Output('skiResizer')
  resizer: EventEmitter<DOMRectReadOnly> = new EventEmitter<DOMRectReadOnly>();

  constructor(private el: ElementRef, private zone: NgZone) { }

  ngOnInit() {
    this.subscriber$ = this.onResizer(this.resizer$.asObservable());
  }

  ngAfterContentInit(): void {
    this.observer.observe(this.el.nativeElement, {box: "border-box"});
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.el.nativeElement);
    this.resizer$.complete();
    this.subscriber$.unsubscribe();
  }

  private onResizer(resizer$: Observable<DOMRectReadOnly>): SubscriptionLike {
    return resizer$
      .pipe(
        filter((r) => !isNil(r)),
        debounceTime(100)
      )
      .subscribe((rect: DOMRectReadOnly) => {
        this.zone.run(() => this.resizer.emit(rect));
      })
  }

  private receiveResizing(entries: ResizeObserverEntry[]): void {
    if (isEmpty(entries)) {
      return;
    }
    this.resizer$.next(entries[0]?.contentRect ?? null);
  }
}
