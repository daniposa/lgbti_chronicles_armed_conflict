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
        <div class="modal-body">
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
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .modal-box {
      background: white;
      border-radius: 12px;
      max-width: 90vw;
      max-height: 80vh;
      overflow: auto;
      padding: 24px;
      position: relative;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    }
    .modal-close {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      font-size: 28px;
      cursor: pointer;
      color: #666;
      line-height: 1;
    }
    .modal-close:hover { color: #333; }
    .modal-body {
      padding-right: 36px;
      line-height: 1.6;
    }
    .highlight {
      background: rgba(100, 150, 255, 0.2);
      padding: 0 2px;
    }
  `]
})
export class ModalContentComponent {
  @Input() set content(value: ModalContent | null) {
    if (value) {
      this.segments = this.parser.parseMarkedText(value.rawText, value.tooltips);
    } else {
      this.segments = [];
    }
  }
  @Output() close = new EventEmitter<void>();

  segments: TextSegment[] = [];

  constructor(private parser: TextParserService) {}
}
