import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  SecurityContext,
  inject
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Highlights: hover shows a transient tooltip; click pins an explainer panel
 * (selectable text + close). Only one pinned panel at a time across the app.
 *
 * Tooltip strings may contain a **trusted HTML fragment** (see `content.data.ts`):
 * paragraphs, links (`<a href="https://..." target="_blank" rel="noopener noreferrer">`),
 * images (`<img src="images/..." alt="...">`), `<br>`, `<strong>`, etc.
 * HTML is passed through `DomSanitizer.sanitize(HTML, …)` so links/images work when safe.
 * Author fragments only in `content.data.ts` (trusted), not from user input.
 */
@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input() appTooltip = '';

  private tooltipEl: HTMLElement | null = null;
  private pinned = false;
  private static activePinned: TooltipDirective | null = null;

  private readonly boundReposition = (): void => {
    this.positionTooltip();
  };

  private readonly sanitizer = inject(DomSanitizer);

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.el.nativeElement.style.cursor = 'help';
    this.el.nativeElement.style.textDecoration = 'underline';
    this.el.nativeElement.style.textDecorationStyle = 'dotted';
    this.el.nativeElement.style.textUnderlineOffset = '2px';
  }

  ngOnDestroy(): void {
    if (TooltipDirective.activePinned === this) {
      TooltipDirective.activePinned = null;
    }
    this.removeTooltip();
    this.pinned = false;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.appTooltip || this.pinned) return;
    this.showEphemeral();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.pinned) return;
    this.removeTooltip();
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent): void {
    e.stopPropagation();
    if (!this.appTooltip) return;

    if (this.pinned) return;

    if (TooltipDirective.activePinned && TooltipDirective.activePinned !== this) {
      TooltipDirective.activePinned.unpin();
    }

    this.pinned = true;
    TooltipDirective.activePinned = this;
    this.removeTooltip();
    this.showPinned();
  }

  private unpin(): void {
    this.pinned = false;
    if (TooltipDirective.activePinned === this) {
      TooltipDirective.activePinned = null;
    }
    this.removeTooltip();
  }

  private showEphemeral(): void {
    if (!this.appTooltip) return;
    this.removeTooltip();
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.className = 'app-tooltip app-tooltip--ephemeral';
    this.setTooltipInnerHtml(this.tooltipEl, this.appTooltip);
    this.tooltipEl.style.cssText = `
      position: fixed;
      z-index: 10000;
      pointer-events: none;
    `;
    document.body.appendChild(this.tooltipEl);
    this.positionTooltip();
    this.attachRepositionListeners();
  }

  private showPinned(): void {
    if (!this.appTooltip) return;

    const root = document.createElement('div');
    root.className = 'app-tooltip app-tooltip--pinned';
    root.style.cssText = `
      position: fixed;
      z-index: 10001;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'app-tooltip-close';
    closeBtn.setAttribute('aria-label', 'Cerrar explicación');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', ev => {
      ev.stopPropagation();
      ev.preventDefault();
      this.unpin();
    });
    closeBtn.addEventListener('mousedown', ev => ev.stopPropagation());

    const body = document.createElement('div');
    body.className = 'app-tooltip-body';
    this.setTooltipInnerHtml(body, this.appTooltip);

    root.appendChild(closeBtn);
    root.appendChild(body);

    this.tooltipEl = root;
    document.body.appendChild(this.tooltipEl);
    this.positionTooltip();
    this.attachRepositionListeners();
  }

  private attachRepositionListeners(): void {
    window.addEventListener('scroll', this.boundReposition, true);
    window.addEventListener('resize', this.boundReposition);
  }

  private removeTooltip(): void {
    window.removeEventListener('scroll', this.boundReposition, true);
    window.removeEventListener('resize', this.boundReposition);
    if (this.tooltipEl?.parentNode) {
      this.tooltipEl.parentNode.removeChild(this.tooltipEl);
    }
    this.tooltipEl = null;
  }

  /**
   * Renders tooltip HTML. Strings must come from trusted static data (`content.data.ts`),
   * not from end users — `sanitize` still strips `javascript:` etc.
   */
  private setTooltipInnerHtml(el: HTMLElement, html: string): void {
    el.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, html) ?? '';
  }

  private positionTooltip(): void {
    if (!this.tooltipEl) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    let top = rect.top - tooltipRect.height - 8;
    if (top < 8) top = rect.bottom + 8;
    if (left < 8) left = 8;
    if (left + tooltipRect.width > window.innerWidth - 8) {
      left = window.innerWidth - tooltipRect.width - 8;
    }
    this.tooltipEl.style.left = `${left}px`;
    this.tooltipEl.style.top = `${top}px`;
  }
}
