import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[horizontalScroll]',
})
export class HorizontalScrollDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    const scrollable = this.el.nativeElement;
    if (scrollable.scrollWidth <= scrollable.clientWidth) return;
    event.preventDefault();
    scrollable.scrollLeft += event.deltaY;
  }
}
