import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input() appTooltip = '';
  private tooltipEl: HTMLElement | null = null;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.el.nativeElement.style.cursor = 'help';
    this.el.nativeElement.style.textDecoration = 'underline';
    this.el.nativeElement.style.textDecorationStyle = 'dotted';
  }

  ngOnDestroy(): void {
    this.hide();
  }

  @HostListener('mouseenter')
  show(): void {
    if (!this.appTooltip) return;
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.className = 'app-tooltip';
    this.tooltipEl.textContent = this.appTooltip;
    this.tooltipEl.style.cssText = `
      position: fixed;
      background: rgba(0,0,0,0.85);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 13px;
      max-width: 280px;
      z-index: 10000;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(this.tooltipEl);
    this.positionTooltip();
  }

  @HostListener('mouseleave')
  hide(): void {
    if (this.tooltipEl?.parentNode) {
      this.tooltipEl.parentNode.removeChild(this.tooltipEl);
    }
    this.tooltipEl = null;
  }

  private positionTooltip(): void {
    if (!this.tooltipEl) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    let top = rect.top - tooltipRect.height - 8;
    if (top < 8) top = rect.bottom + 8;
    if (left < 8) left = 8;
    if (left + tooltipRect.width > window.innerWidth - 8) left = window.innerWidth - tooltipRect.width - 8;
    this.tooltipEl.style.left = `${left}px`;
    this.tooltipEl.style.top = `${top}px`;
  }
}
