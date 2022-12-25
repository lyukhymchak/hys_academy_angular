import {
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  ViewContainerRef,
} from '@angular/core';

import { CartTooltipComponent } from '../components/cart-tooltip/cart-tooltip.component';

@Directive({
  selector: '[cartTooltip]',
})
export class CartTooltipDirective {
  private componentRef: ComponentRef<any> | null = null;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === null) {
      this.componentRef =
        this.viewContainerRef.createComponent(CartTooltipComponent);

      const element = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      this.elementRef.nativeElement.appendChild(element);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private destroy(): void {
    if (this.componentRef !== null) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
