import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextParserService, type TextSegment } from '../../../../core/services/text-parser.service';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import type { ModalContent } from '../../../../core/models/content.model';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [TooltipDirective],
  template: `
    <div class="modal-backdrop" (click)="close.emit()">
      <div class="modal-box" (click)="$event.stopPropagation()">
        <button class="modal-close" (click)="close.emit()" aria-label="Close">&times;</button>
        @if (modalTitle) {
          <h2 class="modal-title">{{ modalTitle }}</h2>
        }
        <div class="modal-body chapter-text">
          @for (seg of segments; track $index) {
            @if (seg.isHighlight) {
              <span [appTooltip]="seg.tooltip ?? ''" class="highlight">{{ seg.text }}</span>
            } @else {
              <span>{{ seg.text }}</span>
            }
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(44, 36, 32, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .modal-box {
      background: var(--color-paper);
      border-radius: 4px;
      max-width: min(90vw, var(--reading-width));
      max-height: 80vh;
      overflow: auto;
      padding: var(--space-xl);
      position: relative;
      box-shadow: var(--shadow-modal);
      border: 1px solid var(--color-border);
    }
    .modal-close {
      position: absolute;
      top: var(--space-sm);
      right: var(--space-sm);
      background: none;
      border: none;
      font-size: 1.75rem;
      cursor: pointer;
      color: var(--color-ink-muted);
      line-height: 1;
      font-family: var(--font-body);
      transition: color 0.2s;
    }
    .modal-close:hover { color: var(--color-ink); }
    .modal-title {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--color-ink);
      margin: 0 0 var(--space-lg) 0;
      letter-spacing: 0.02em;
    }
    .modal-body.chapter-text {
      padding-right: var(--space-xl);
      font-size: 1.05rem;
      line-height: 1.85;
      color: var(--color-ink);
    }
    .modal-body.chapter-text::first-letter {
      font-family: var(--font-display);
      font-size: 3rem;
      float: left;
      line-height: 1;
      margin-right: 0.35rem;
      margin-top: 0.05rem;
      color: var(--color-ink);
    }
    .highlight {
      background: rgba(139, 105, 20, 0.15);
      padding: 0 0.15em;
      border-bottom: 1px dotted var(--color-accent);
    }
  `]
})
export class ModalContentComponent {
  @Input() set content(value: ModalContent | null) {
    if (value) {
      this.modalTitle = value.title;
      this.segments = this.parser.parseMarkedText(value.rawText, value.tooltips);
    } else {
      this.modalTitle = '';
      this.segments = [];
    }
  }
  @Output() close = new EventEmitter<void>();

  modalTitle = '';
  segments: TextSegment[] = [];

  constructor(private parser: TextParserService) {}
}
