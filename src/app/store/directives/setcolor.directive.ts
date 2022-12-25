import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[setColor]',
})
export class SetColorDirective implements OnInit {
  @Input() public price: number;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.element.nativeElement,
      'color',
      this.setColor()
    );
  }

  private setColor(): string {
    if (this.price > 50) {
      return '#C71585';
    }

    if (this.price > 30) {
      return '#8A2BE2';
    }

    return '';
  }
}
